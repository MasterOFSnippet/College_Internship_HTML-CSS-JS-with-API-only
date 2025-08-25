
// API key for ExchangeRate-API
const apiKey = "fd09ce2575fedf3e33114d69";

// DOM elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapBtn');
const resultElement = document.getElementById('result');
const rateInfoElement = document.getElementById('rateInfo');
const updateTimeElement = document.getElementById('updateTime');
const fromSymbol = document.getElementById('from-symbol');
const loadingElement = document.getElementById('loading');

// Currency symbols map
const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'Fr',
  CNY: '¥'
};

// Update currency symbol when fromCurrency changes
fromCurrency.addEventListener('change', updateCurrencySymbol);

function updateCurrencySymbol() {
  const currencyCode = fromCurrency.value;
  fromSymbol.textContent = currencySymbols[currencyCode] || '$';
}

// Initialize with current date/time
updateTimeElement.textContent = new Date().toLocaleString();

// Swap currencies function
swapBtn.addEventListener('click', () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  updateCurrencySymbol();
  convertCurrency();
});

// Convert currency function
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultElement.innerHTML = '<span style="color: #dc3545;">Please enter a valid amount</span>';
    rateInfoElement.textContent = '';
    return;
  }

  // Show loading state
  loadingElement.style.display = 'block';
  resultElement.textContent = '-';
  rateInfoElement.textContent = 'Converting...';

  try {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === "error") {
      throw new Error(data["error-type"]);
    }

    const rate = data.conversion_rates[to];
    const convertedAmount = (amount * rate).toFixed(2);

    // Format numbers with commas
    const formattedConverted = parseFloat(convertedAmount).toLocaleString('en-IN', { maximumFractionDigits: 2 });

    // Update UI
    resultElement.innerHTML = `${formattedConverted} <span style="font-size: 0.6em;">${to}</span>`;
    rateInfoElement.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;

    // Update time
    updateTimeElement.textContent = new Date().toLocaleString();

  } catch (error) {
    console.error("Conversion error:", error);
    resultElement.innerHTML = '<span style="color: #dc3545;">Conversion failed</span>';
    rateInfoElement.textContent = 'Please check your connection and try again';
  } finally {
    // Hide loading state
    loadingElement.style.display = 'none';
  }
}

// Event listeners
convertBtn.addEventListener('click', convertCurrency);
amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

// Initialize
updateCurrencySymbol();

// Convert on page load with default values
setTimeout(convertCurrency, 500);


