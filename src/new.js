import { forEach } from "lodash";
import "./style.css";
const btnDeposit = document.getElementById("btnDeposit");
function Account(name, balance) {
  this.name = name;
  this.balance = balance;
}

Account.prototype.deposit = function(amount) {
  if (this._isPositive(amount)) {
    this.balance += amount;
    console.info(`Deposit: ${this.name} new balance is ${this.balance}`);
    return true;
  }
  return false;
}

function withdraw(name, amount){
  a.withdraw(amount)
}

btnWithdraw.addEventListener('click', () => {
  const accName = document.getElementById('ddlWithdraw').value
  const amountWithdrawed = document.getElementById('userWithdraw').value
  withdraw(accName, amountWithdrawed)
})

function deposit(name, amount){
  name = new Account(name, amount);
  console.log(name)
  name.deposit(amount)
}


btnDeposit.addEventListener('click', () => {
  const accName = document.getElementById('userDepositName').value
  const amountAdded = document.getElementById('userDeposit').value
  deposit(accName, amountAdded)
})


Account.prototype.withdraw = function(amount) {
  if (this._isAllowed(amount)) {
    this.balance -= amount;
    console.info(`Withdraw: ${this.name} new balance is ${this.balance}`);
    return true;
  }
  return false;
}

Account.prototype.transfer = function(amount, account) {
  if (this.withdraw(amount) && account.deposit(amount)) {
    console.info(`Transfer: ${amount} has been moved from ${this.name} to ${account.name}`);
    return true;
  }
  return false;
}

function transfer(amount, nameFrom, nameTo){
  nameFrom = new Account(nameTo, amount);
  console.log(amount, nameFrom, nameTo)
  nameFrom.transfer(amount, nameTo)
}

btnTransfer.addEventListener('click', () => {
  const accNameFrom = document.getElementById('ddlTransferFrom').value
  const accNameTo = document.getElementById('ddlTransferTo').value
  const amountTransferred = document.getElementById('userTransfer').value
  transfer(amountTransferred, accNameFrom, accNameTo)
})


Account.prototype._isPositive = function(amount) {
  const isPositive = amount > 0;
  if (!isPositive) {
    console.error('Amount must be positive!');
    return false;
  }
  return true;
}

Account.prototype._isAllowed = function(amount) {
  if (!this._isPositive(amount)) return false;

  const isAllowed = this.balance - amount >= 0;
  if (!isAllowed) {
    console.error('You have insufficent funds!');
    return false;
  }
  return true;
}

// const a = new Account('a', 0);
// const b = new Account('b', 0);
// const c = new Account('c', 0);



function transfer(sender, receipient) {
  btnTransfer.addEventListener("click", () => {
    const users = JSON.parse(localStorage.getItem("accountUsers"));
    let storeSender;
    let storeReceipient;
    users.map((user) => {
      if (sender.value === user.name) {
        storeSender = user.balance;
        
        console.log(storeSender, user.name);
      } else if (receipient.value === user.name) {
        storeReceipient = user.balance;
        console.log(storeReceipient, user.name);
      }
      //   if (user.balance > Number(amountTransfer.value)) {
      //     user.balance -= Number(amountTransfer.value);
      //   }else {
      //     alert("insufficent funds");
      //   }
      // }else if (user.name === receipient.value){

      // }
    });
    localStorage.setItem("accountUsers", JSON.stringify(users));
  });
}