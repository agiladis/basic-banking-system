class BankAccount {
  constructor() {
    this.saldo = 0;
  }

  cekSaldo() {
    return this.saldo;
  }

  tambahSaldo() {
    let value = prompt('Masukan jumlah saldo yang akan ditambahkan');

    if (!isNumber(value)) {
      alert('Masukkan hanya angka!');
      return;
    }

    this.saldo += parseInt(value);
  }

  kurangiSaldo() {
    let value = prompt('Masukan jumlah saldo yang akan ditarik');

    if (!isNumber(value)) {
      alert('Masukkan hanya angka!');
      return;
    }

    if (parseInt(value) > this.saldo) {
      alert('Saldo anda tidak cukup');
      return;
    }

    this.saldo -= parseInt(value);
  }
}

const bankAccount = new BankAccount();
const tambahSaldoButton = document.getElementById('tambahSaldo');
const kurangiSaldoButton = document.getElementById('kurangiSaldo');

tambahSaldoButton.addEventListener('click', () => {
  bankAccount.tambahSaldo();
  tampilkanSaldo(bankAccount.cekSaldo());
});

kurangiSaldoButton.addEventListener('click', () => {
  bankAccount.kurangiSaldo();
  tampilkanSaldo(bankAccount.cekSaldo());
});

isNumber = (input) => {
  if (isNaN(Number(input))) {
    return false;
  }

  return true;
};

tampilkanSaldo = (saldo = 0) => {
  alert(`saldo kamu saat ini : ${saldo}`);
};
