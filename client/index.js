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

const TOTAL_TICKETS = 12;
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

let account;

const accountEl = document.getElementById('account');
const ticketsEl = document.getElementById('tickets');

const buyTicket = async (ticket) => {
  await contract.methods.buyTicket(ticket.id).send({
    from: account,
    value: ticket.price,
  });
  await refreshTickets();
}

const refreshTickets = async () => {
  ticketsEl.innerHTML = '';
  for (let i = 0; i < TOTAL_TICKETS; i++) {
    const ticket = await contract.methods.tickets(i).call();
    ticket.id = i;

    if (ticket.owner === EMPTY_ADDRESS) {
      const ticketEl = createElementFromString(`
        <div class="col-sm mb-4">
          <div class="card" style="width: 18rem;">
            <div class="card-img-top p-4" style="background-color:#F6F7F9;">
              <img style="width:100%; height: auto;" src=${ticketImg} alt="Ticket image">
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between mb-3">
                <h5 class="card-title mb-0">${ticket.price/1e18} ETH</h5>
                <span class="badge badge-dark" style="background-color: #343a40;">#${ticket.id + 1}</span>
              </div>
              <button class="btn btn-primary">Buy</button>
            </div>
          </div>
        </div>
      `);
      const button = ticketEl.querySelector('button');

      button.onclick = buyTicket.bind(null, ticket);
      ticketsEl.appendChild(ticketEl);
    }
  }
}

const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  account = accounts[0];
  accountEl.innerText = account;
  await refreshTickets();
}

main();