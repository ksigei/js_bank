import "./style.css";

const acctBalanceLbl = document.getElementById("acctBalanceLbl");
// const deposits = [];
// const withdrawals = [];
// let totalBalance = 25;
const userDeposit = document.getElementById("userDeposit");
const btnDeposit = document.getElementById("btnDeposit");
const userWithdraw = document.getElementById("userWithdraw");
const btnWithdraw = document.getElementById("btnWithdraw");

function Account(name, balance) {
  this.name = name;
  this.balance = balance;
}

Account.prototype.deposit = function (amount) {
  if (this._isPositive(amount)) {
    this.balance += amount;
    console.info(`Deposit: ${this.name} new balance is ${this.balance}`);
    return true;
  }
  return false;
};

Account.prototype.withdraw = function (amount) {
  if (this._isAllowed(amount)) {
    this.balance -= amount;
    console.info(`Withdraw: ${this.name} new balance is ${this.balance}`);
    return true;
  }
  return false;
};

Account.prototype.transfer = function (amount, account) {
  if (this.withdraw(amount) && account.deposit(amount)) {
    console.info(
      `Transfer: ${amount} has been moved from ${this.name} to ${account.name}`
    );
    return true;
  }
  return false;
};

Account.prototype._isPositive = function (amount) {
  const isPositive = amount > 0;
  if (!isPositive) {
    console.error("Amount must be positive!");
    return false;
  }
  return true;
};

Account.prototype._isAllowed = function (amount) {
  if (!this._isPositive(amount)) return false;

  const isAllowed = this.balance - amount >= 0;
  if (!isAllowed) {
    console.error("You have insufficent funds!");
    return false;
  }
  return true;
};

// const amount = document.getElementById("userDeposit").value;
// const select = document.getElementById("ddlDeposit");
// const option = select.options[select.selectedIndex];
// const name = option.text;

window.addEventListener("DOMContentLoaded", () => {
  console.log("name:", name, ", amount:", amount);
  console.log("Option:", name);

  const newAcc = new Account(name, amount);
  acctBalanceLbl.innerText += `${newAcc.name}: ${newAcc.balance}\n`;
});
// const userName = new Account(name, amount);
// const Juma = new Account("Juma", 0);
// const Linda = new Account("Linda", 111);

//   acctBalanceLbl.innerText += `before:  Wanjiru: ${Wanjiru.balance}, Juma: ${Juma.balance}\n`;
const depositBtn = document.getElementById("btnDeposit");
depositBtn.addEventListener("click", () => {
  const amount = document.getElementById("userDeposit").value;
  const select = document.getElementById("ddlDeposit");
  const option = select.options[select.selectedIndex];
  const name = option.text;
  const newAcc = new Account(name, amount);
  Object.keys(newAcc).forEach(key => {
    //  console.log('array', newAcc[key])
    window.localStorage.setItem("Accounts", JSON.stringify(newAcc[key]));
  });
});
// change to ${customerA}.transfer(${amount}, ${customerB})
// Wanjiru.transfer(30, Linda);

// acctBalanceLbl.innerText += `Wanjiru: ${Wanjiru.balance}, Juma: ${Juma.balance}, Linda: ${Linda.balance}\n`;
// const userWithdraw = document.getElementById("userWithdraw");
// btnWithdraw.addEventListener("click", () => {

// });

// btnTransfer.addEventListener("click", () => {

// });
