# Abstract
Create an online marketplace that operates on the blockchain.
 
There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.
 
The central marketplace is managed by a group of administrators. Admins allow store owners to add stores to the marketplace. Store owners can manage their store’s inventory and funds. Shoppers can visit stores and purchase goods that are in stock using cryptocurrency. 

# User Stories
## Contract Deplopyer
1. The account deploying the contract by default becomes an Administrator. 
2. He/she can create one or more Administrator. 
3. The other Administrator cannot create an Administrator.

## Administrator
1. An administrator opens the web app. 
2. The web app reads the address and identifies that the user is an admin, showing them admin only functions, such as managing store owners. 
3. An admin adds an address to the list of approved store owners, so if the owner of that address logs into the app, they have access to the store owner functions.
 
## Store Owner 
1. An approved store owner logs into the app. 
2. The web app recognizes their address and identifies them as a store owner. 
3. They are shown the store owner functions. 
4. They can create a new storefront that will be displayed on the marketplace. 
5. They can also see the storefronts that they have already created. 
6. They can click on a storefront to manage it. 
7. They can add/remove products to the storefront or change any of the products’ prices. 
8. They can also withdraw any funds that the store has collected from sales.

## Shopper
1. A shopper logs into the app. 
2. The web app does not recognize their address so they are shown the generic shopper application. 
3. From the main page they can browse all of the storefronts that have been created in the marketplace. 
4. Clicking on a storefront will take them to a product page. 
5. They can see a list of products offered by the store, including their price and quantity. 
6. Shoppers can purchase a product, which will debit their account and send it to the store. 
7. The quantity of the item in the store’s inventory will be reduced by the appropriate amount.
 
# Suggestions
Here are some suggestions for additional components that your project could include:
- Add functionality that allows store owners to create an auction for an individual item in their store
- Give store owners the option to accept any ERC-20 token
- Deploy your dApp to a testnet
- Include the deployed contract address so people can interact with it
- Serve the UI from IPFS or a traditional web server
