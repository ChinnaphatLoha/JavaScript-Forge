const first_currency = document.getElementById("first-currency");
const second_currency = document.getElementById("second-currency");

const first_amount = document.getElementById("first-amount");
const second_amount = document.getElementById("second-amount");

const rateText = document.getElementById("rate");
const switcher = document.getElementById("btn");

// when the element "first_currency or second_currency" is changed ("change event")
// it will call "calculateExchangeRate" function
first_currency.addEventListener("change", calculateExchangeRate);
second_currency.addEventListener("change", calculateExchangeRate);

first_amount.addEventListener("input", calculateExchangeRate);
second_amount.addEventListener("input", calculateExchangeRate);

function calculateExchangeRate() {
  const first_unit = first_currency.value;
  const second_unit = second_currency.value;
  // calling API => Promise function returns .json then its data
  fetch(`https://api.exchangerate-api.com/v4/latest/${first_unit}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[second_unit];
      rateText.innerText = `1 ${first_unit} = ${rate} ${second_unit}`;
      second_amount.value = round(first_amount.value * rate, 3);
    });
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

switcher.addEventListener('click', () => {
    const temp = first_currency.value; // keep in temp for switching
    first_currency.value = second_currency.value;
    second_currency.value = temp;
    calculateExchangeRate();
})

calculateExchangeRate();