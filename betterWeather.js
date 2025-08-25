const apiKey = "a126ce63779299e1e00ac4484da8d337";
const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const body = document.body;

let bgInterval; // store slideshow interval

btn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") btn.click();
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    btn.disabled = true;
    result.innerHTML = `<p>⏳ Loading...</p>`;

    let response = await fetch(url);
    if (!response.ok) {
      result.innerHTML = `<p>❌ City not found</p>`;
      return;
    }

    let data = await response.json();

    // 🌈 Background based on weather
    const weatherMain = data.weather[0].main.toLowerCase();
    let keywords = ["sky", "clouds"]; // default

    if (weatherMain.includes("rain")) keywords = ["rain", "storm"];
    else if (weatherMain.includes("cloud")) keywords = ["cloudy", "overcast"];
    else if (weatherMain.includes("clear")) keywords = ["sunny", "blue-sky"];
    else if (weatherMain.includes("snow")) keywords = ["snow", "winter"];
    else if (weatherMain.includes("storm")) keywords = ["storm", "lightning"];

    startSlideshow(keywords);

    result.innerHTML = `
      <h3>📍 ${data.name}, ${data.sys.country}</h3>
      <h2>🌡️ ${data.main.temp} °C</h2>
      <p>☁️ Weather: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind: ${data.wind.speed} m/s</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" />
    `;
  } catch (error) {
    result.innerHTML = `<p>⚠️ Something went wrong. Try again later.</p>`;
    console.error(error);
  } finally {
    btn.disabled = false;
  }
}

// 🌌 Live background slideshow
function startSlideshow(keywords) {
  let i = 0;

  // clear old interval if running
  if (bgInterval) clearInterval(bgInterval);

  function changeBackground() {
    const query = keywords[i % keywords.length];
    body.style.background = `url('https://source.unsplash.com/1600x900/?${query}') no-repeat center/cover`;
    i++;
  }

  changeBackground(); // show first background immediately
  bgInterval = setInterval(changeBackground, 20000); // every 20 sec
}
