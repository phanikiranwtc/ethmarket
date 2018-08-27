# Store.sol
1. **Reentrancy** : In the buyProductFromStore, there are states where competition / race exist among few methods. For example - update of quantity, redemption of tokens and sending ether to the store contracts are vulnerable to the race condition. This function has applied following considerations to avoid the reentrancy attack  
  - It finishes the internal work, like updating inventory (i.e. quantity) before calling external functions to transfer ether or tokens
  - within external function calls, it first reduces the token balance of the shopper before considering the discount value
  - issues new tokens when the payment is successful
2. **Reentrancy** - in the same method, used the flag lockTokenBalances to apply the mutex pattern to avoid the Reentrancy attack
3. **Integer Overflow / Underflow** - In the EIP20.sol, used the pattern *balances[_to] + _value >= balances[_to]* to ensure that the interger overflow gets identified. 
