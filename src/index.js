import { forEach } from "lodash";
import "./style.css";
const btnDeposit = document.querySelector("#btnDeposit");
const accName = document.querySelector("#userDepositName");
const amountAdded = document.querySelector("#userDeposit");
const userWithdraw = document.querySelector("#userWithdraw");
const amountWithdrawed = document.querySelector("#amountWithdrawed");
const transferTo = document.querySelector("#transferTo");
const transferFrom = document.querySelector("#transferFrom");
const btnTransfer = document.querySelector("#btnTransfer");
const amountTransfer = document.querySelector("#amountTransfer");
const balanceDiv = document.querySelector(".balances");
const msgDeposit = document.querySelector(".msgDeposit");
const msgWithdraw = document.querySelector(".msgWithdraw");
const msgTransfer= document.querySelector(".msgTransfer");

class Account {
  constructor() {
    const accountUsers = [
      { name: "Wanjiru", balance: 0 },
      { name: "Juma", balance: 0 },
      { name: "Linda", balance: 0 },
    ];
    if (localStorage.getItem("accountUsers") === null) {
      localStorage.setItem("accountUsers", JSON.stringify(accountUsers));
    }
  }
}
const accounts = new Account();
const deposit = () => {
  btnDeposit.addEventListener("click", () => {
    const users = JSON.parse(localStorage.getItem("accountUsers"));
    users.map((user) => {
      if (user.name === accName.value) {
        user.balance += Number(amountAdded.value);
        msgDeposit.innerHTML = `Success!`;
      }
    });
    localStorage.setItem("accountUsers", JSON.stringify(users));
    displayBalance();
  });
};
deposit();
const withdraw = () => {
  btnWithdraw.addEventListener("click", () => {
    const users = JSON.parse(localStorage.getItem("accountUsers"));
    users.map((user) => {
      if (user.name === userWithdraw.value) {
        if (user.balance >= Number(amountWithdrawed.value)) {
          user.balance -= Number(amountWithdrawed.value);
          msgWithdraw.innerHTML = `Withdraw Successful!`;
        } else {
          msgWithdraw.innerHTML = `Insufficient funds`;
        }
      }
    });
    localStorage.setItem("accountUsers", JSON.stringify(users));

    displayBalance();
  });
};
withdraw();

const transfer = (sender, receipient) => {
  let storeSender;
  let storeReceipient;
  btnTransfer.addEventListener("click", () => {
    const users = JSON.parse(localStorage.getItem("accountUsers"));
    users.map((user) => {
      if (sender.value === user.name) {
        storeSender = user;
      } else if (receipient.value === user.name) {
        storeReceipient = user;
      }
    });
    if (storeSender.balance < Number(amountTransfer.value)) {
      // const newClassa = msgTransfer.toggleClassList('message')
      msgTransfer.innerHTML = `Insufficient funds`;
    } else {
      storeSender.balance -= Number(amountTransfer.value);
      storeReceipient.balance += Number(amountTransfer.value);
      msgTransfer.innerHTML = `Tranfer Successful!`;
    }
    localStorage.setItem("accountUsers", JSON.stringify(users));
    displayBalance();
  });
};
transfer(transferFrom, transferTo);

const displayBalance = () => {
  const users = JSON.parse(localStorage.getItem("accountUsers"));
  const newDiv = document.createElement("ol");
  balanceDiv.innerHTML = ''
  users.forEach((user) => {
    newDiv.innerHTML += `<li>Account Name: ${user.name}, Balance: ${user.balance}</li>`;
  });
  balanceDiv.appendChild(newDiv);
};
displayBalance();
