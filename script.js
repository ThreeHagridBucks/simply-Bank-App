"use strict";

// Simply Bank App

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "UAH",
  locale: "uk-UA",
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "RUB",
  locale: "ru-RU",
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "CAD",
  locale: "fr-CA",
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseNickname = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatTransactions = function (date, locale) {
  const getDayesBetween2Dates = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = getDayesBetween2Dates(new Date(), date);

  if (daysPassed === 0) return "Сегодня";
  if (daysPassed === 1) return "Вчера";
  if (daysPassed <= 5) return `${daysPassed} дня назад`;
  else {
    // const day = `${date.getDate()}`.padStart(2, "0");
    // const month = `${date.getMonth() + 1}`.padStart(2, "0");
    // const year = date.getUTCFullYear();

    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = "";

  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactions(date, account.locale);

    const formattedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );

    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">
        ${index + 1} ${transType}
      </div>
      <div class="transactions__date">${transDate}</div>
      <div class="transactions__value">${formattedTrans}</div>
    </div>`;

    containerTransactions.insertAdjacentHTML("afterbegin", transactionRow);
  });
};

////////////////////////////////////

const createNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickName = acc.userName
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

createNicknames(accounts);
// console.log(accounts);

////////////////////////////////////////////////

// const transactions = [300, 250, -500, 5000, -750, -180, 50, 1400, -350, -120];
// const deposites = transactions.filter((trans) => trans > 0);
// console.log(deposites);

/////////////////////////////////////////////////

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

///////////////////////////////////////////////

const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(
    depositesTotal,
    account.locale,
    account.currency
  );

  const withdrawalsTotal = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = formatCurrency(
    withdrawalsTotal,
    account.locale,
    account.currency
  );

  const interestTotal = account.transactions
    .filter((trans) => trans > 0)
    .map((depos) => (depos * account.interest) / 100)
    .filter((interest, index, arr) => {
      console.log(arr);
      return interest >= 5;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
};

const updateUI = function (account) {
  //Display transacions
  displayTransactions(account);

  //Display balance
  displayBalance(account);

  //Display total
  displayTotal(account);
};

let currentAccount, currentLogOutTimer;

// Always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

const startLogoutTimer = function () {
  const logOutTimerCallback = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    // в каждом вызове показывать оставшееся время в ui
    labelTimer.textContent = `${minutes}:${seconds}`;
    // после истечения времени остановить таймер и выйти из приложения
    if (time === 0) {
      clearInterval(logOutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Войдите в свой аккаунт`;
    }

    time--;
  };
  // установить время выхода через 5 минут
  let time = 300;

  // Вызов таймера каждую секунду
  logOutTimerCallback();
  const logOutTimer = setInterval(logOutTimerCallback, 1000);
  return logOutTimer;
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.nickName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and welcome message
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Рады, что вы снова с нами, ${
      currentAccount.userName.split(" ")[0]
    }!`;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "2-digit",
      year: "numeric",
      weekday: "long",
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //Clear inputs
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    //  проверяю существует ли таймер
    if (currentLogOutTimer) clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const tranferAmount = +inputTransferAmount.value;
  const recipientNickName = inputTransferTo.value;
  const recipientAccount = accounts.find(
    (account) => account.nickName === recipientNickName
  );

  inputTransferTo.value = "";
  inputTransferTo.blur();
  inputTransferAmount.value = "";
  inputTransferAmount.blur();

  if (
    tranferAmount > 0 &&
    currentAccount.balance >= tranferAmount &&
    recipientAccount &&
    currentAccount.nickName !== recipientAccount.nickName
  ) {
    // Add transaction
    currentAccount.transactions.push(-tranferAmount);
    recipientAccount.transactions.push(tranferAmount);

    // Add transaction date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    // переустанавливаю таймер
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseNickname.value === currentAccount.nickName &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      (account) => account.nickName === currentAccount.nickName
    );
    accounts.splice(currentAccountIndex, 1);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Войдите в свой аккаунт`;
  }
  inputCloseNickname.value = "";
  inputClosePin.value = "";
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(
      (trans) => trans >= (loanAmount * 10) / 100
    )
  ) {
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.blur();

  // переустанавлию таймер
  clearInterval(currentLogOutTimer);
  currentLogOutTimer = startLogoutTimer();
});

let transacionsSorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !transacionsSorted);
  transacionsSorted = !transacionsSorted;
});

// % 2 emam
const logoImage = document.querySelector(".logo");
logoImage.addEventListener("click", function () {
  [...document.querySelectorAll(".transactions__row")].forEach(function (
    row,
    i
  ) {
    if (i % 2 === 0) {
      row.style.backgroundColor = "grey";
    }
  });
});

// array.from() exam.
// const logoImage = document.querySelector(".logo");
// logoImage.addEventListener("click", function () {
//   const transactionsUi = document.querySelectorAll(".transactions__value");
//   console.log(transactionsUi);
//   const transactionsUiArray = Array.from(
//     transactionsUi,
//     (elem) => +elem.textContent
//   );
//   console.log(transactionsUiArray);
// });
