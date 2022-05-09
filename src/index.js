import "./style.css";
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

const Wanjiru = new Account("Wanjiru", 100);
const Juma = new Account("Juma", 333);
const Linda = new Account("Linda", 3333);

acctBalanceLbl.innerText += `before:  Wanjiru: ${Wanjiru.balance}, Juma: ${Juma.balance}, Linda: ${Linda.balance}\n`;
const btnDeposit = document.getElementById("btnDeposit");
const btnTransfer = document.getElementById("btnTransfer");

btnTransfer.addEventListener("click", () => {
  Wanjiru.transfer(10, Juma);
  newBalacnce();
});

const select = document.getElementById("ddlTransfer");
const value = select[select.selectedIndex].value; // get selected option value
const text = select.options[select.selectedIndex].text;
select.addEventListener("change", () => {
  Wanjiru.transfer(10, Juma);
  newBalacnce();
  console.log("line 76:", value);
});

function newBalacnce() {
  acctBalanceLbl.innerText += `after:  Wanjiru: ${Wanjiru.balance}, Juma: ${Juma.balance}, Linda: ${Linda.balance}\n`;
}
