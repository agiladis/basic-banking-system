import { isEmpty, isNumber, isPositive } from './validate_input.js';

class BankAccount {
  constructor() {
    this.accountID = 1;
    this.balance = 0;
  }

  deposit() {
    let amount = prompt('Masukan jumlah saldo yang akan ditambahkan');

    // check amount is number
    if (!isNumber(amount)) {
      alert('Masukkan hanya angka!');
      return;
    }

    amount = parseInt(amount);

    // check is amount empty
    if (isEmpty(amount)) {
      alert('Masukkan angka dan bukan 0!');
      return;
    }

    // check is it number positive
    if (!isPositive(amount)) {
      alert('Masukkan hanya bilangan positif');
      return;
    }

    this.balance += amount;
  }
}

export default BankAccount;
