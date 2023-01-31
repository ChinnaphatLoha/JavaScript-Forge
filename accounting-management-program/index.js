const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const title = document.getElementById("title");
const amount = document.getElementById("amount");

let transactions = [];

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/, ",");
};

const randomID = () => Math.floor(Math.random() * 1000000);

function addDataToList(transaction) {
  const symbol = transaction.amount < 0 ? "-" : "+";
  const status = transaction.amount < 0 ? "minus" : "plus";
  const item = document.createElement("li");

  item.classList.add(status);
  item.innerHTML = `${transaction.title}<span>${symbol} ${formatNumber(
    Math.abs(transaction.amount)
  )}</span>
        <button class="delete-btn" onclick="removeData(${transaction.id})">x</button>`;
  list.appendChild(item);
}

function calculateMoney() {
  // map the attribute "amount" of transactions to "amounts"
  const amounts = transactions.map((transactions) => transactions.amount);
  // reduce by summation of value in "amounts" (item)
  const total = amounts
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  // use filter for having the elements (item) in specific condition
  const income = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  const expense = Math.abs(
    amounts
      .filter((item) => item < 0)
      .reduce((result, item) => (result += item), 0)
  ).toFixed(2);

  balance.innerText = "฿" + formatNumber(total);
  money_plus.innerText = "฿" + formatNumber(income);
  money_minus.innerText = "฿" + formatNumber(expense);
}

function removeData(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  update();
}

function addTransaction(e) {
  e.preventDefault();
  if (title.value.trim() === "" || amount.value === "") {
    alert("Please fill all the data");
  } else if (amount.value == 0) {
    alert("the amount can not be 0 (zero)");
  } else {
    const data = {
      id: randomID(),
      title: title.value,
      amount: +amount.value,
    };
    transactions.push(data);
    addDataToList(data);
    calculateMoney();
    title.value = "";
    amount.value = "";
  }
}

function update() {
  list.innerHTML = "";
  transactions.forEach(addDataToList);
  calculateMoney();
}

form.addEventListener("submit", addTransaction);

update();
