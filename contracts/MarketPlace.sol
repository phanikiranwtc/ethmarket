pragma solidity ^0.4.22;

import "./Store.sol";
import "./library/Utils.sol";
import "./EIP20.sol";
import "./library/SafeMath.sol";
/**
 * There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.
 * The central marketplace is managed by a group of administrators. Admins allow store owners to add stores
 * to the marketplace. Store owners can manage their store’s inventory and funds. Shoppers can visit stores and purchase
 * goods that are in stock using cryptocurrency.
 *
 */

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
