# Web3 Tix

Testing out deploying a smart contracts to create tickets for people to buy with ETH.


## Installation

1. Make sure you have Truffle installed globally.
    ```javascript
    npm install -g truffle
    ```

2. Install Ganache and create a new workspace

3. Alternatively, you can run the Truffle development console instead of Ganache UI.
    ```javascript
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

6. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console
    test

    // outside the development console
    truffle test
    ```

## FAQ

* __Where is my production build?__

    The production build will be in the `app/build` folder after running `npm run build` in the `app` folder.

* __Where can I find more documentation?__

    Start by reading the [Truffle](http://truffleframework.com/) documentation.