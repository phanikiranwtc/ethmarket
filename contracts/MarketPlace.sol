pragma solidity ^0.4.22;

import "./Store.sol";
import "./library/Utils.sol";

/**
 * There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.
 * The central marketplace is managed by a group of administrators. Admins allow store owners to add stores
 * to the marketplace. Store owners can manage their store’s inventory and funds. Shoppers can visit stores and purchase
 * goods that are in stock using cryptocurrency.
 *
 */

contract MarketPlace {
    address superAdmin;
    address[] public adminUsers;
    address[] public storeOwners;
    uint private nextStoreId;

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
    }

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
    * This function verifies if an address has an admin access or not.
    */
    function checkAdmingAccess(address addressToVerify) view public returns(bool) {
      for (uint index = 0; index <adminUsers.length; index++) {
        if (adminUsers[index] == addressToVerify) {
          return true;
        }
      }

      return false;
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
     * A store owner shall be able to create one or more stores.
     * The created store will be associated with the store owner using storeFrontMap, where the store owner's
     * address is a key and the value is a map of storeId and Store.
     *
    */
    function createStoreFront( string storeName, string storeDescription ) public onlyStoreOwner returns(uint){

        address[] storage stores = storeFrontMap[msg.sender];
        stores[stores.length] = new Store( storeName, storeDescription, nextStoreId );

        return nextStoreId++;
    }

    /**
     * this function will be used for retriving all the stores of a given store owner
     *
     */
    function getStores(address storeOwnerAddress) public view returns(address[]) {
        return storeFrontMap[storeOwnerAddress];
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
