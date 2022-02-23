"use strict";

class ChangeHandler {
  constructor(amountDue) {
    this.amountDue = amountDue;
    this.cashTendered = 0;
  }
  insertCoin(typeOfCoin) {
    if (typeOfCoin === "quarter") {
      this.cashTendered += 25;
    } else if (typeOfCoin === "dime") {
      this.cashTendered += 10;
    } else if (typeOfCoin === "nickel") {
      this.cashTendered += 5;
    } else if (typeOfCoin === "penny") {
      this.cashTendered += 1;
    }
  }
  isPaymentSufficient() {
    if (this.amountDue > this.cashTendered) {
      return false;
    } else {
      return true;
    }
  }
  giveChange() {
    const totalBack = this.cashTendered - this.amountDue;
    let givingBack = 0;
    const changeObj = {
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
    };
    while (totalBack > givingBack) {
      if (25 + givingBack <= totalBack) {
        changeObj.quarters++;
        givingBack += 25;
      } else if (10 + givingBack <= totalBack) {
        changeObj.dimes++;
        givingBack += 10;
      } else if (5 + givingBack <= totalBack) {
        changeObj.nickels++;
        givingBack += 5;
      } else if (+givingBack <= totalBack) {
        changeObj.pennies++;
        givingBack += 1;
      }
    }
    return changeObj;
  }
}

module.exports = ChangeHandler;
