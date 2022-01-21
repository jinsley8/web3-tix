import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import configuration from '../build/contracts/Tickets.json';
import ticketImg from './images/ticket.jpg'

const createElementFromString = (string) => {
  const div = document.createElement('div');
  div.innerHTML = string.trim();
  return div.firstChild;
}

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  Web3.givenProvider || 'http://127.0.0.1:7545'
);

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let account;

const accountEl = document.getElementById('account');

const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  account = accounts[0];
  accountEl.innerText = account;
}

main();