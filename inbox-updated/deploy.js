const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const{ interface,bytecode } = require('./compile');


const provider = new HDWalletProvider(
    'join palm ring miss save brief chair arena flee walnut organ miss',
    'https://sepolia.infura.io/v3/74ac7fed04a64724a555e653b0ddb5c5'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(interface)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();