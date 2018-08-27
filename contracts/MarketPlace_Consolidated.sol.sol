pragma solidity 0.4.24;
// produced by the Solididy File Flattener (c) David Appleton 2018
// contact : dave@akomba.com
// released under Apache 2.0 licence
library Utils {
    /**
     * Move this function into a library and call that library in this contract
    */
    function existInTheArray(address[] arrayOfEntities, address entity) public pure returns(bool) {

        for (uint arrayIndex = 0; arrayIndex < arrayOfEntities.length; arrayIndex++) {
            if ( arrayOfEntities[arrayIndex] == entity ) {
                return true;
            }
        }

        return false;
    }
}

library SafeMath {
    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
    function sub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function div(uint a, uint b) internal pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}

contract EIP20Interface {

  function totalSupply() public view returns (uint256);

  function balanceOf(address _who) public view returns (uint256);

  function allowance(address _owner, address _spender)
    public view returns (uint256);

  function transfer(address _to, uint256 _value) public returns (bool);

  function approve(address _spender, uint256 _value)
    public returns (bool);

  function transferFrom(address _from, address _to, uint256 _value)
    public returns (bool);

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
  );

  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}

contract EIP20 is EIP20Interface {
 using SafeMath for uint256;

 string constant public name = "Online Market Place";
 string constant public symbol = "OMP";
 uint8 constant public decimals = 3;

 mapping (address => uint256) private balances;

 /**
 * Ideally this mapping of the mapping shall be used. However, in this contract, I don't see
 * a need yet.
 */
 mapping (address => mapping(address => uint256)) private allowed;

/**
* Initially the total supply will be zero. However, based on the store's loyalty
* policy the store can issue a token, which will be valid across the market place.
*/
 uint256 private totalSupply_ = 0;

event IssuedNewTokens(
      address _senderAddress,
      address _toAddress,
      uint256 _amount );

 /**
 * @dev Total number of tokens in existence
 */
 function totalSupply() public view returns (uint256) {
   return totalSupply_;
 }

 /**
 * @dev Gets the balance of the specified address.
 * @param _owner The address to query the the balance of.
 * @return An uint256 representing the amount owned by the passed address.
 */
 function balanceOf(address _owner) public view returns (uint256) {
   return balances[_owner];
 }

 /**
  * @dev Function to check the amount of tokens that an owner allowed to a spender.
  * @param _owner address The address which owns the funds.
  * @param _spender address The address which will spend the funds.
  * @return A uint256 specifying the amount of tokens still available for the spender.
  */
 function allowance(
   address _owner,
   address _spender
  )
   public
   view
   returns (uint256)
 {
   return allowed[_owner][_spender];
 }

 /**
 * @dev Transfer token for a specified address
 * @param _to The address to transfer to.
 * @param _value The amount to be transferred.
 */
 function transfer(address _to, uint256 _value) public returns (bool) {
   require(_value <= balances[msg.sender]);
   require(_to != address(0));

   balances[msg.sender] = balances[msg.sender].sub(_value);
   balances[_to] = balances[_to].add(_value);
   emit Transfer(msg.sender, _to, _value);
   return true;
 }

 /**
  * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
  * TODO: Currently, I am not using the allowed mapping. Which means I am partially fullfilling the
  *       ERC20 token standard.
  *
  * @param _spender The address which will spend the funds.
  * @param _value The amount of tokens to be spent.
  */
 function approve(address _spender, uint256 _value) public returns (bool) {
   // allowed[msg.sender][_spender] = _value;
   emit Approval(msg.sender, _spender, _value);
   return true;
 }

 /**
  * @dev Transfer tokens from one address to another
  * @param _from address The address which you want to send tokens from
  * @param _to address The address which you want to transfer to
  * @param _value uint256 the amount of tokens to be transferred
  */
 function transferFrom(
   address _from,
   address _to,
   uint256 _value
 )
   public
   returns (bool)
 {
   require(_value <= balances[_from]);
   // require(_value <= allowed[_from][msg.sender]);
   require(_to != address(0));

   balances[_from] = balances[_from].sub(_value);
   balances[_to] = balances[_to].add(_value);
   // allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
   emit Transfer(_from, _to, _value);
   return true;
 }

 /**
 * @dev this function will issue new tokens to the to address.
 * @param _senderAddress - the smart contract using this method should know that the sender is ultimately
 *      responsible for honoring all the tokens created in this system
 * @param _toAddress - this accont will be credited with certain tokens
 * @param _amount - the amount
 */
 function issueNewTokens(
              address _senderAddress,
              address _toAddress,
              uint256 _amount ) public returns (uint256){

    _mint(_toAddress, _amount);
    emit IssuedNewTokens(_senderAddress, _toAddress, _amount);
    return balances[_toAddress];
 }

 /**
  *
  * @dev Internal function that mints an amount of the token and assigns it to
  * an account. This encapsulates the modification of balances such that the
  * proper events are emitted.
  * @param _account The account that will receive the created tokens.
  * @param _amount The amount that will be created.
  */
 function _mint(address _account, uint256 _amount) internal {
   require(_account != 0);
   totalSupply_ = totalSupply_.add(_amount);
   balances[_account] = balances[_account].add(_amount);
   emit Transfer(address(0), _account, _amount);
 }

 /**
  * @dev Internal function that burns an amount of the token of a given
  * account.
  * @param _account The account whose tokens will be burnt.
  * @param _amount The amount that will be burnt.
  */
 function _burn(address _account, uint256 _amount) internal {
   require(_account != 0);
   require(_amount <= balances[_account]);

   totalSupply_ = totalSupply_.sub(_amount);
   balances[_account] = balances[_account].sub(_amount);
   emit Transfer(_account, address(0), _amount);
 }

}

contract Store {
    using SafeMath for uint256;

    // Onwer is the actual store owner who is creating the store.
    address private owner;
    string private storeName;
    string private description;
    uint private storeId;
    uint private productCount;
    uint private nextProductId;
    Product[] private products;
    EIP20 private eip20Token;

    /**
    * At some stage we can oraclize the token price. However, for now let's consider this
    * for the sake of any calculation.
    */
    uint256 constant private tokenPriceInWei = 10000000000000;

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
        uint256 discountPercentage;
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
        address indexed storeAddress,
        address indexed storeOwner,
        address indexed buyerAddress,
        uint senderBalance,
        uint weiToTransfer
      );

    event TokensCouldNotBeTransferred(
        address _tokenFrom,
        address _tokenTo,
        uint256 tokensToBeTransferred );

    event LogAsEvent(address param1, address param2, string param3);
    /**
    * @dev Creates a Store Contract which holds the associated products and the balance corresponding to the
    *      sales of such products.
    * @param _storeName - the name of the stores
    * @param _description - the description about the stores
    * @param _storeId - the store id of the store, which will be unique across the market place
    * @param _storeOwner - the actual owner of the store (will be an externally owned accounts)
    */
    constructor(
            string _storeName,
            string _description,
            uint _storeId,
            address _storeOwner,
            EIP20 _eip20Token ) public {

        owner = _storeOwner;
        storeName = _storeName;
        storeId = _storeId;
        description = _description;
        productCount = 0;
        nextProductId = 1;
        eip20Token = _eip20Token;
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
    * @return a list of values with the following details
    *   - Owner Address
    *   - Store name
    *   - Store identifier
    *   - Store description
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
     * TODO: Add expiry feature and use the Auto Deprecation pattern to expire a product. Also, implement the use case
     *      that will prevent the shoppers from buying an expired product!
     *
    */
    function addProductToTheStore(
            string productName,
            string productDesc,
            uint price,
            uint quantity ) public onlyOwner returns(uint) {

            uint256 discountPercentage = 10;
            products.length += 1;

            products[productCount] = Product(
                nextProductId,
                productName,
                productDesc,
                price,
                quantity,
                ProductStatus.ACTIVE,
                discountPercentage );

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
     * TODO : Add an additional parameter for discountPercentage
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
    function getProductDetails(uint _productId) public view returns(string, string, uint, uint, ProductStatus, uint256 ) {
        uint productIndex = _productId - 1;

        return ( products[productIndex].productName,
                 products[productIndex].description,
                 products[productIndex].price,
                 products[productIndex].quantity,
                 products[productIndex].status,
                 products[productIndex].discountPercentage );
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
        // require( msg.value == weiToTransfer, "The supplied value is lesser than the actual price of the items!");

        //Reduce the corresponding quantity from the inventory
        products[productIndex].quantity = products[productIndex].quantity - _quantity;

        emit PurchaseOfProduct(_productId, _quantity, address(this), owner, msg.sender, msg.sender.balance, weiToTransfer);

        // Redeem tokens by transferring the equivalent amount of tokens to the store owners
        uint256 discountValue = 0;

        if (eip20Token.balanceOf(msg.sender) > 0) {
          uint256 tokenValue = eip20Token.balanceOf(msg.sender) * tokenPriceInWei;

          if ( tokenValue <= weiToTransfer ) {
            // Transfer all the tokens of the shopper to the store owner and
            // set the discounted value to be same as the token values
            discountValue = tokenValue;
            eip20Token.transferFrom( msg.sender, owner, eip20Token.balanceOf(msg.sender) );
          } else {
            discountValue = weiToTransfer;
            eip20Token.transferFrom( msg.sender, owner, weiToTransfer.div(tokenPriceInWei) );
          }
        }

        // Transfer fund from the shopper's acount into the store's account
        uint256 finalAmountToBePaid = weiToTransfer.sub(discountValue);
        if ( finalAmountToBePaid > 0 ) {
          address myAddress = address(this);
          myAddress.transfer( finalAmountToBePaid );
        }

        // Transfer loyalty tokens to the shoppers
        if ( products[productIndex].discountPercentage > 0 ) {
          uint256 tokensToBeTransferred = (weiToTransfer * products[productIndex].discountPercentage) / (tokenPriceInWei * 100);
          if ( eip20Token.balanceOf(owner) >= tokensToBeTransferred ) {
            eip20Token.transferFrom( owner,
                                     msg.sender,
                                     tokensToBeTransferred
                                   );
          } else {
            // Just create an event which will indicate that certain number of tokens could not be Transferred
            emit TokensCouldNotBeTransferred(owner, msg.sender, tokensToBeTransferred);
          }

        }


        return true;
    }

    /**
     * A store owner can withdraw fund from a given store
     *
     * BP1: Fail early and fail loud
     *  - Fail early and fail loud pattern has been used to ensure that zero amount withdrwal doesn't take place.
    */
    function withdrawFund(uint withdrawAmount) public payable onlyOwner returns(bool) {
        require(withdrawAmount > 0, "The withdrwal amount must be a positive number!");
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

contract MarketPlace {
    using SafeMath for uint256;

    address superAdmin;
    address[] public adminUsers;
    address[] public storeOwners;
    uint private nextStoreId;
    EIP20 private eip20Token;

    // mapping of stores of a given store owner
    mapping (address => address[]) public storeFrontMap;

    /**
     * Initialize state variables, specifically, the Super Administrator!
     * Also, add that address in the Admin list.
     */
    constructor() public {
        superAdmin = msg.sender;
        adminUsers.push(msg.sender);
        nextStoreId = 1;
        eip20Token = new EIP20();
    }

    event NewStore (
      string storeName,
      string storeDescription,
      address storeOwner,
      address storeAddress
    );

    event AccessingStore(Store currentStore);

    /**
     * Only SuperAdmin shall be able to create an Admin user
    */
    modifier onlySuperAdmin {
        require( msg.sender == superAdmin, "Only Super Administrator can invoke this function.");
        _;
    }

    /**
     * Only Admin shall be allowed to create a store
    */
    modifier onlyAdmin {
        require( Utils.existInTheArray(adminUsers, msg.sender), "Only an Administrator can invoke this function.");
        _;
    }

    /**
     * Only store owners shall be allowed to add stores.
     *
    */
    modifier onlyStoreOwner {
        require( Utils.existInTheArray(storeOwners, msg.sender), "Only an Administrator can invoke this function.");
        _;
    }

    /**
     * A super administrator can create one or more administrator, who will have same access, except that
     * they cannot create another administrator
     */
    function createAdminUser(address newAdminUser) public onlySuperAdmin returns(address){
        require(!Utils.existInTheArray(adminUsers, newAdminUser), "The address is already in the Admin group!");

        adminUsers.push(newAdminUser);

        return newAdminUser;
    }

    /**
    * This function shall return all the admin address in the market place
    */
    function getAdminUsers() public view returns(address[]) {
      return adminUsers;
    }

    /**
    * This function verifies if an address has the following accesses or not
    * - Super Admin
    * - Admins
    * - Store Owner
    */
    function checkAccess(address addressToVerify) view public returns(bool, bool, bool) {
      bool isAdmin = Utils.existInTheArray(adminUsers, addressToVerify);
      bool isStoreOwner = Utils.existInTheArray(storeOwners, addressToVerify);
      bool isSuperAdmin = false;

      if ( addressToVerify == superAdmin ) {
        isSuperAdmin = true;
      }

      return (isSuperAdmin, isAdmin, isStoreOwner);
    }

    /**
     * Any Admin shall be able to add a store owner.
     * Of course, we need to make sure that a given address is added only once.
    */
    function createStoreOwner(address newStoreOwnerAddress) public onlyAdmin returns(bool){
        require( !Utils.existInTheArray(storeOwners, newStoreOwnerAddress), "The store owner with the same address already exist!");

        storeOwners.push(newStoreOwnerAddress);

        return true;
    }


    /**
    * This function shall return all the store owners address in the market place
    */
    function getStoreOwners() public view returns(address[]) {
      return storeOwners;
    }

    /**
     * A store owner shall be able to create one or more stores.
     * The created store will be associated with the store owner using storeFrontMap, where the store owner's
     * address is a key and the value is a map of storeId and Store.
     *
    */
    function createStoreFront( string storeName, string storeDescription ) public onlyStoreOwner returns(address){
        uint storeCount = storeFrontMap[msg.sender].length;

        if (storeCount == 0) {
          storeFrontMap[msg.sender].length = 1;
        } else {
          storeFrontMap[msg.sender].length = storeCount + 1;
        }

        storeFrontMap[msg.sender][storeCount] = address(new Store(
                                                            storeName,
                                                            storeDescription,
                                                            nextStoreId,
                                                            msg.sender,
                                                            eip20Token ));

        nextStoreId++;

        emit NewStore(
                storeName,
                storeDescription,
                msg.sender,
                storeFrontMap[msg.sender][storeCount] );

        return storeFrontMap[msg.sender][storeCount];
    }

    /**
     * this function will be used for retriving all the stores of a given store owner
     *
     */
    function getStores(address storeOwnerAddress) public view returns(address[]) {
        if ( storeOwnerAddress != 0 ) {
            return storeFrontMap[storeOwnerAddress];
        }
        else {
            //
            // The caller is looking for all the stores in the market place
            //
            uint totalStoreCount = 0;
            uint storeOwnersCount;

            for (storeOwnersCount = 0; storeOwnersCount < storeOwners.length; storeOwnersCount++) {
                totalStoreCount += storeFrontMap[storeOwners[storeOwnersCount]].length;
            }

            address[] memory allStores = new address[](totalStoreCount);
            uint tempStoreCount = 0;

            for ( storeOwnersCount = 0; storeOwnersCount < storeOwners.length; storeOwnersCount++ ) {
                address[] memory storesOfOwner = storeFrontMap[storeOwners[storeOwnersCount]];

                for ( uint storeFrontCountOfOwner = 0;
                      storeFrontCountOfOwner < storesOfOwner.length;
                      storeFrontCountOfOwner++) {
                  allStores[tempStoreCount] = storesOfOwner[storeFrontCountOfOwner];
                  tempStoreCount++;
                }
            }

            return allStores;
        }
    }

    /**
     * Any Admin shall be able to allocate certain number of new tokens to a store owner.
     * Of course, we need to make sure that a given address is indeed a store owner
    */
    function allocateNewTokens(address storeOwnerAddress, uint256 numberOfTokens) public onlySuperAdmin returns(uint256){
        require( Utils.existInTheArray(storeOwners, storeOwnerAddress), "The provided address is not a store owner!");
        return eip20Token.issueNewTokens(superAdmin, storeOwnerAddress, numberOfTokens);
    }

    /**
     * @dev This method returns the token balance of a given account.
     * @param accountAddress is the address whose balance is being queried
     */
     function getTokenBalance(address accountAddress) public view returns(uint256 tokenBalance) {
       return eip20Token.balanceOf(accountAddress);
     }

    /**
     * The market place can be destructed by only the super admin, that too when we have at least 75% of the store owners
     * agreeing to this decision.
    */
    function closeMarketPlace() public onlySuperAdmin {
        bool haveConsentOfStoreOwners = getConsentForClosure();

        require(haveConsentOfStoreOwners, "You do not have the sufficient consensus to close the market place!");

        selfdestruct(superAdmin);
    }

    /**
     * In case we want to allow the closure of the Market Place then implement this function
     * with proper logic.
    */
    function getConsentForClosure() private pure returns(bool) {
        return false;
    }

}
