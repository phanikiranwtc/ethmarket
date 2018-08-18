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
    uint private productCount;
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

    event PurchaseOfProduct(
        uint productId,
        uint quantity,
        address storeAddress,
        address storeOwner,
        address buyerAddress,
        uint senderBalance,
        uint weiToTransfer
      );

    event LogAsEvent(address param1, address param2, string param3);

    constructor(
            string _storeName,
            string _description,
            uint _storeId,
            address storeOwner ) public {

        owner = storeOwner;
        storeName = _storeName;
        storeId = _storeId;
        description = _description;
        productCount = 0;
        nextProductId = 1;
    }

    /**
    * Since this contract needs to accept ether, declare an anonymous payable function.
    */
    function() public payable { }

    /**
     * Only (store) owners shall be allowed to add or update the store specific details - e.g. product.
     *
    */
    modifier onlyOwner {
        require( (owner == msg.sender), "Only a store owner can invoke this function!");
        _;
    }

    /**
    * A function to return the state details for a given store contract
    */
    function getStoreDetails() public view returns( address, string, uint, string ) {
      return (owner, storeName, storeId, description);
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
            products[productCount] = Product(
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

            productCount++;

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
        uint productIndex = productId - 1;
        require( products[productIndex].productId != 0 , "Product for the given store id and product id combination does not exist!");

        products[productIndex].productName = productName;
        products[productIndex].description = productDesc;
        products[productIndex].price = price;
        products[productIndex].quantity = quantity;

        return true;
    }

    /**
     * A store owner can decide to remove a product from his/her store.
     * A removed product will not be visible to shoppers!
     *
    */
    function removeProduct(uint _productId ) public onlyOwner returns(bool){
        uint productIndex = _productId - 1;

        require( products[productIndex].status == ProductStatus.ACTIVE, "Only the active product can be be removed from the store!");
        products[productIndex].status = ProductStatus.REMOVED;

        return true;
    }

    /**
     * A store owner can decide to remove a product from his/her store.
     * A removed product will not be visible to shoppers!
     *
    */
    function reActivateProduct(uint _productId ) public onlyOwner returns(bool){
        uint productIndex = _productId - 1;

        require( products[productIndex].status == ProductStatus.REMOVED, "Only the Inactive product can be activated!");
        products[productIndex].status = ProductStatus.ACTIVE;

        return true;
    }

    /**
    * getProducts will return all the products of this store.
    */
    function getProducts( bool activeOnlyFlag ) public view returns( uint[] ) {

      uint numOfProducts = 0;

      if ( activeOnlyFlag == true) {
        for (uint8 prodCount=0; prodCount<products.length; prodCount++) {
            if (products[prodCount].status == ProductStatus.ACTIVE) {
                numOfProducts++;
            }
        }
      } else {
        numOfProducts = products.length;
      }


      uint[] memory productIds = new uint[](numOfProducts);

      if ( numOfProducts > 0 ) {

        uint8 tmpCount = 0;

        for (prodCount=0; prodCount<products.length; prodCount++) {
            if ( activeOnlyFlag == true ) {
              if (products[prodCount].status == ProductStatus.ACTIVE) {
                productIds[tmpCount] = products[prodCount].productId;
                tmpCount++;
              }
            } else {
              productIds[tmpCount] = products[prodCount].productId;
              tmpCount++;
            }

        }
      }

      return productIds;
    }


    /*
    * For a given product identifier of the store, this method will return the product details.
    */
    function getProductDetails(uint _productId) public view returns(string, string, uint, uint, ProductStatus) {
        uint productIndex = _productId - 1;

        return ( products[productIndex].productName,
                 products[productIndex].description,
                 products[productIndex].price,
                 products[productIndex].quantity,
                 products[productIndex].status );
    }

    /**
     * The shopper can buy this product using this function.
     *   // owner.transfer( weiToTransfer );
       // address(this).transfer( msg.value );
       // owner.transfer( msg.value );
    */
    function buyProductFromStore(uint _productId, uint _quantity) public payable returns (bool){
        uint productIndex = _productId - 1;
        uint256 weiToTransfer = _quantity * products[productIndex].price;

        require( products[productIndex].status == ProductStatus.ACTIVE, "Only the active product can be bought!");
        require( owner != msg.sender, "The owner cannot buy its own product!");
        require( _quantity <= products[productIndex].quantity, "The store does not have sufficient quantity of the product");
        require( msg.value <= msg.sender.balance, "The buyer does not have sufficient balance in his / her account!");
        require( msg.value == weiToTransfer, "The supplied value is lesser than the actual price of the items!");

        //Reduce the corresponding quantity from the inventory
        products[productIndex].quantity = products[productIndex].quantity - _quantity;

        emit PurchaseOfProduct(_productId, _quantity, address(this), owner, msg.sender, msg.sender.balance, weiToTransfer);

        // Transfer fund from the shopper's acount into the store's account
        address myAddress = address(this);
        myAddress.transfer( msg.value );

        return true;
    }

    /**
     * A store owner can withdraw fund from a given store
    */
    function withdrawFund(uint withdrawAmount) public payable onlyOwner returns(bool) {
        require(address(this).balance >= withdrawAmount, "The current store balance amount must be greater than the withdrawal amount!");
        owner.transfer(withdrawAmount);

        return true;
    }

    /**
    * Return the balance owned by this store
    */
    function getBalanceOfStore() constant public returns(uint){
        return address(this).balance;
    }

}
