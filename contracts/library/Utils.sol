pragma solidity 0.4.24;

library Utils {
    /**
     * Move this function into a library and call that library in this contract
     * @param arrayOfEntities contains the array consisting of addresses against which the look up will take Place
     * @param entity which is being looked upon for existence
     * @return a boolean value, indicating if the entity was found in the array or not
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
