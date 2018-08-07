pragma solidity ^0.4.22;

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
