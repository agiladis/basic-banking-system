import BankAccount from './banking_system.js';

class Transaction extends BankAccount {
  constructor() {
    super();
    this.date = new Date();
    this.amount = 0;
  }

  postBalance() {
    return this.balance;
  }
}

const ATMTransaction = new Transaction();
const tambahSaldoButton = document.getElementById('tambahSaldo');

tambahSaldoButton.addEventListener('click', () => {
  ATMTransaction.deposit();
  tampilkanSaldo(ATMTransaction.postBalance());
});

// kurangiSaldoButton.addEventListener('click', () => {
//   bankAccount.kurangiSaldo();
//   tampilkanSaldo(bankAccount.cekSaldo());
// });

const tampilkanSaldo = (saldo) => {
  alert(`saldo kamu saat ini : ${saldo}`);
};
