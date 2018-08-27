# Contracts
1. In the withdrawFund function, I used *Fail early and fail loud* pattern to ensure that zero amount withdrwal doesn't take place
2. *Restricting Access* - Restrict other contracts’ access to the state by making all the state variables private. 
3. The MarketPlace.sol uses the *Mortal* pattern to ensure that only the SuperAdmin can close the market place by going through certain consensus
4. *State Machine* - when the shoppers buy a product, based on the state of the store owner's token count, the discount behaviour change significantly.
5. Used the *Circuit Breaker* pattern to halt the market, in the case of any untowards activities identified by the super administrator
6. In the withdrawFund function of the Store contract, usage of *Pull over Push Payments*. In the combination with withdraw pattern, this protects against re-entrancy and denial of service attacks.
7. 

# Testing 
1. Async and Await pattern was used to make the test cases look simpler
