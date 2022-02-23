const ChangeHandler = require("../src/script");

describe("ChangeHandler constructor", () => {
  test("amountDue is set based on an argument", () => {
    const changeHandlerObject = new ChangeHandler(10);
    expect(changeHandlerObject.amountDue).toBe(10);
  });
  test("cashTendered is set to zero", () => {
    const changeHandlerObject = new ChangeHandler(10);
    expect(changeHandlerObject.cashTendered).toBe(0);
  });
});

describe("insertCoin method", () => {
  test("Inserting a quarter adds 25", () => {
    const changeHandlerObject = new ChangeHandler(10);
    changeHandlerObject.insertCoin("quarter");
    expect(changeHandlerObject.cashTendered).toBe(25);
  });
  test("Inserting two quarter adds 50", () => {
    const changeHandlerObject = new ChangeHandler(10);
    changeHandlerObject.insertCoin("quarter");
    changeHandlerObject.insertCoin("quarter");
    expect(changeHandlerObject.cashTendered).toBe(50);
  });
  test("Inserting a dime adds 10", () => {
    const changeHandlerObject = new ChangeHandler(10);
    changeHandlerObject.insertCoin("dime");
    expect(changeHandlerObject.cashTendered).toBe(10);
  });
  test("Inserting a nickel adds 5", () => {
    const changeHandlerObject = new ChangeHandler(10);
    changeHandlerObject.insertCoin("nickel");
    expect(changeHandlerObject.cashTendered).toBe(5);
  });
  test("Inserting a penny adds 1", () => {
    const changeHandlerObject = new ChangeHandler(10);
    changeHandlerObject.insertCoin("penny");
    expect(changeHandlerObject.cashTendered).toBe(1);
  });
});

describe("isPaymentSufficient method", () => {
  test("Returns false if cashTendered is less than amountDue", () => {
    const changeHandlerObject = new ChangeHandler(10);
    changeHandlerObject.insertCoin("nickel");
    expect(changeHandlerObject.isPaymentSufficient()).toBe(false);
  });
  test("Returns true if cashTendered is more than amountDue", () => {
    const changeHandlerObject = new ChangeHandler(10);
    changeHandlerObject.insertCoin("quarter");
    expect(changeHandlerObject.isPaymentSufficient()).toBe(true);
  });
});

describe("giveChange method", () => {
  test("32 change produces: quarters: 1, dimes: 0, nickels: 1, pennies: 2", () => {
    const changeHandlerObject = new ChangeHandler(0);
    changeHandlerObject.insertCoin("nickel");
    changeHandlerObject.insertCoin("quarter");
    changeHandlerObject.insertCoin("penny");
    changeHandlerObject.insertCoin("penny");
    expect(changeHandlerObject.giveChange()).toEqual({
      quarters: 1,
      dimes: 0,
      nickels: 1,
      pennies: 2,
    });
  });
  test("10 change produces: quarters: 0, dimes: 1, nickels: 0, pennies: 0", () => {
    const changeHandlerObject = new ChangeHandler(0);
    changeHandlerObject.insertCoin("dime");
    expect(changeHandlerObject.giveChange()).toEqual({
      quarters: 0,
      dimes: 1,
      nickels: 0,
      pennies: 0,
    });
  });
  test("27 change produces: quarters: 1, dimes: 0, nickels: 0, pennies: 2", () => {
    const changeHandlerObject = new ChangeHandler(0);
    changeHandlerObject.insertCoin("quarter");
    changeHandlerObject.insertCoin("penny");
    changeHandlerObject.insertCoin("penny");
    expect(changeHandlerObject.giveChange()).toEqual({
      quarters: 1,
      dimes: 0,
      nickels: 0,
      pennies: 2,
    });
  });
  test("68 change produces: quarters: 2, dimes: 1, nickels: 1, pennies: 3", () => {
    const changeHandlerObject = new ChangeHandler(0);
    changeHandlerObject.insertCoin("quarter");
    changeHandlerObject.insertCoin("quarter");
    changeHandlerObject.insertCoin("dime");
    changeHandlerObject.insertCoin("nickel");
    changeHandlerObject.insertCoin("penny");
    changeHandlerObject.insertCoin("penny");
    changeHandlerObject.insertCoin("penny");
    expect(changeHandlerObject.giveChange()).toEqual({
      quarters: 2,
      dimes: 1,
      nickels: 1,
      pennies: 3,
    });
  });
});
