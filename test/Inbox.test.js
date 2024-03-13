const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert');
const { interface, bytecode } = require('../compile');
const web3 = new Web3(ganache.provider());
// mocha is for testing --> Test Running Framework
// 3 main function --> it , describe, beforeEach 
// it : run a test
// describe : group together it function
// beforeEach --> execute general setup code

// ganache is for deploying smart contract local network
// mocha starts --> deploy new contract --> manipulate contract --> make assertion --> balik ke deploy

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts(); // return a promise
 
    // use one of those accounts to deploy the contract

    // deploying contract
    inbox = await new web3.eth.Contract(JSON.parse(interface)) //arguments : initial message
        .deploy({ data: bytecode, arguments : ['Hi There!']})
        .send({from: accounts[0],gas:'1000000'});
});

// json.parse(interface) --> nyambungin web3 ke interface dari contract
// .deploy : bytecode itu yg di deploy
// . send : from account yang mana dri accounts


describe('Inbox', () => {
    it('deploys a contract',() => {
        assert.ok(inbox.options.address);
    })

    it('has a default message',async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hi There!');
    })

    it('can change the message',async ()=>{
        await inbox.methods.setMessage('bye').send({from:accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
    })
});
