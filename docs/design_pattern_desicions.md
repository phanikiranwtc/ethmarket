# Contracts
1. In the withdrawFund function, I used *Fail early and fail loud* pattern to ensure that zero amount withdrwal doesn't take place
2. *Restricting Access* - Restrict other contracts’ access to the state by making all the state variables private. 
3. The MarketPlace.sol uses the *Mortal* pattern to ensure that only the SuperAdmin can close the market place by going through certain consensus. 


# Testing 
1. Async and Await pattern was used to make the test cases look simpler
