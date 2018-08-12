pragma solidity ^0.4.22;

/**
 * This contract will create all the functionalities related to a store.
 *
 * For example
 * - Adding a product
 * - updating a product
 * - customer being able to view the list of stores
 * - store owner being able to see the stores
 * - customer being able to view the products in a given Store
 *
*/
contract Store {
    // Onwer is the actual store owner who is creating the store.
    address private owner;

    string public storeName;
    string public description;
    uint private storeId;
    uint private nextProductId;
    Product[] public products;

    enum ProductStatus {
        ACTIVE,
        REMOVED
    }

    struct Product {
        uint productId;
        string productName;
        string description;
        uint price;
        uint quantity;
        ProductStatus status;
    }

    event NewProduct(
      uint productId,
      string productName,
      string description,
      uint price,
      uint quantity
      );

    event LogAsEvent(address param1, address param2, string param3);

    constructor(
            string _storeName,
            string _description,
            uint _storeId ) public {

        owner = tx.origin;
        storeName = _storeName;
        storeId = _storeId;
        description = _description;
        nextProductId = 0;

        // emit LogAsEvent(msg.sender, owner, "Constructor");
    }

    /**
     * Only (store) owners shall be allowed to add or update the store specific details - e.g. product.
     *
    */
    modifier onlyOwner {
        require( (owner == msg.sender), "Only a store owner can invoke this function!");
        _;
    }

     /**
     * A store owner will use this function to add a new product to his / her store.
     *
     * Whenever a new product is added, the product map will be updated to hold all the product and their details
     * across all the store and store owners.
     *
    */
    function addProductToTheStore(
            string productName,
            string productDesc,
            uint price,
            uint quantity ) public onlyOwner returns(uint) {

            products.length += 1;
            products[nextProductId] = Product(
                nextProductId,
                productName,
                productDesc,
                price,
                quantity,
                ProductStatus.ACTIVE );

            emit NewProduct(
              nextProductId,
              productName,
              productDesc,
              price,
              quantity
              );

              /*
              emit LogAsEvent(
                  msg.sender,
                  owner,
                  "Manually check if they are same or not!"
              );
              */

            return nextProductId++;
    }

    /**
     * The update product function will be called to update the details of an existing function.
     *
     * In a regular course of a business, the following amounts may get updated.
     * - quantity
     * - productName
     * - price
     * - description
     *
    */
    function updateProduct(
            uint productId,
            string productName,
            string productDesc,
            uint price,
            uint quantity ) public onlyOwner returns(bool) {

        require( products[productId].productId != 0 , "Product for the given store id and product id combination does not exist!");

        products[productId].productName = productName;
        products[productId].description = productDesc;
        products[productId].price = price;
        products[productId].quantity = quantity;

        return true;
    }

    /**
     * A store owner can decide to remove a product from his/her store.
     * A removed product will not be visible to shoppers!
     *
    */
    function removeProduct(uint productId, uint quantity) public onlyOwner {

        require( products[productId].status == ProductStatus.ACTIVE, "Only the active product can be marked as removed!");

        products[productId].quantity = products[productId].quantity - quantity;
        products[productId].status = ProductStatus.REMOVED;
    }

    /**
    * getProducts will return all the products of this store.
    */
    function getProducts() public view returns( uint[] ) {

      uint8 activeProdCount = 0;

      for (uint8 prodCount=0; prodCount<products.length; prodCount++) {
          if (products[prodCount].status == ProductStatus.ACTIVE) {
              activeProdCount++;
          }
      }

      uint[] memory activeProductIds = new uint[](activeProdCount);

      if (activeProdCount > 0) {

        uint8 tmpCount = 0;

        for (prodCount=0; prodCount<products.length; prodCount++) {
            if (products[prodCount].status == ProductStatus.ACTIVE) {
              activeProductIds[tmpCount] = products[prodCount].productId;
              tmpCount++;
            }
        }
      }


      return activeProductIds;
    }

    /*
    * For a given product identifier of the store, this method will return the product details.
    */
    function getProductDetails(uint productId) public view returns(string, string, uint, uint, ProductStatus) {

        return ( products[productId].productName,
                 products[productId].description,
                 products[productId].price,
                 products[productId].quantity,
                 products[productId].status );
    }

    /**
     * The shopper can buy this product using this function.
     *
    */
    function buyProductFromStore(uint _productId, uint _quantity) public payable {

        require( products[_productId].status == ProductStatus.ACTIVE, "Only the active product can be bought!");
        require( owner != msg.sender, "The owner cannot buy its own product!");
        require( _quantity <= products[_productId].quantity, "The store does not have sufficient quantity of the product");

        //Reduce the corresponding quantity from the inventory
        products[_productId].quantity = products[_productId].quantity - _quantity;

        // Transfer fund from the shopper's acount into the store's account
        address(this).transfer( _quantity * products[_productId].price );
    }

    /**
     * A store owner can withdraw fund from a given store
    */
    function withdrawFund(uint withdrawAmount) public payable onlyOwner returns(uint) {
        require(address(this).balance >= withdrawAmount, "The current store balance amount must be greater than the withdrawal amount!");
        owner.transfer(withdrawAmount);
    }

}
