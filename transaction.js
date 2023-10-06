import BankAccount from './banking_system.js';

class Transaction extends BankAccount {
  constructor() {
    super();
    this.date = new Date();
    this.amount = 0;
  }

  postBalance() {
    // this.balance is not refer to BankAccount property, yethowever it's refer to getter method balance()
    return this.balance;
  }
}

const ATMTransaction = new Transaction();
const tambahSaldoButton = document.getElementById('tambahSaldo');
const kurangiSaldoButton = document.getElementById('kurangiSaldo');

tambahSaldoButton.addEventListener('click', async () => {
  ATMTransaction.deposit();
  await transferProcess();
  tampilkanSaldo(ATMTransaction.postBalance());
});

kurangiSaldoButton.addEventListener('click', async () => {
  ATMTransaction.withdraw();
  await transferProcess();
  tampilkanSaldo(ATMTransaction.postBalance());
});

const transferProcess = () => {
  return new Promise((resolve) => {
    console.log('Proses transaksi sedang berlangsung');

    // simulate network delay
    setTimeout(resolve, 1000);
  });
};

const tampilkanSaldo = (saldo) => {
  alert(`saldo kamu saat ini : ${saldo}`);
};
