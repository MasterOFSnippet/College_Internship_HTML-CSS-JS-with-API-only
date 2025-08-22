const apiKey = "fd09ce2575fedf3e33114d69"; // free API key: https://app.exchangerate-api.com/
const convertBtn = document.getElementById("convertBtn");

convertBtn.addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (amount === "" || amount <= 0) {
    document.getElementById("result").innerText = "⚠️ Please enter a valid amount!";
    return;
  }

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === "error") {
      document.getElementById("result").innerText = "❌ Invalid API key or request";
      return;
    }

    const rate = data.conversion_rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    document.getElementById("result").innerText =
      `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;

  } catch (error) {
    document.getElementById("result").innerText = "⚠️ Something went wrong!";
  }
});
