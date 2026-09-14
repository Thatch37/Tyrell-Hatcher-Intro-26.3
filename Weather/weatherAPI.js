let currentCity = null;
let activeEndpoint = "temperature";

const cityInput   = document.getElementById("city-input");
const searchBtn   = document.getElementById("search-btn");
const navTemp     = document.getElementById("nav-temp");
const navHumidity = document.getElementById("nav-humidity");
const dataDisplay = document.getElementById("data-display");
const errorMsg    = document.getElementById("error-msg");

function geocodeCity(cityName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cityName
  )}&count=1&language=en&format=json`;

  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Geocoding request failed.");
      return res.json();
    })
    .then(data => {
      if (!data.results || data.results.length === 0) {
        throw new Error(`City "${cityName}" not found.`);
      }
      const r = data.results[0];
      return { name: r.name, latitude: r.latitude, longitude: r.longitude };
    });
}

function fetchWeather(city, endpoint) {
  const variable =
    endpoint === "temperature" ? "temperature_2m" : "relative_humidity_2m";

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${city.latitude}` +
    `&longitude=${city.longitude}` +
    `&current=${variable}` +
    `&temperature_unit=fahrenheit`;

  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Weather request failed.");
      return res.json();
    })
    .then(data => data.current[variable]);
}

function render(city, endpoint, value) {
  const isTemp = endpoint === "temperature";
  const unit   = isTemp ? "°F" : "%";
  const label  = isTemp ? "Current Temperature" : "Current Humidity";

  dataDisplay.innerHTML = `
    <p class="city-name">${city.name}</p>
    <p class="data-value">${value}${unit}</p>
    <p class="data-label">${label}</p>
  `;
}

function loadEndpoint(endpoint) {
  errorMsg.textContent = "";
  dataDisplay.innerHTML = `<p class="placeholder">Loading…</p>`;

  let chain = Promise.resolve();

  if (!currentCity) {
    const name = cityInput.value.trim();
    if (!name) {
      dataDisplay.innerHTML = `<p class="placeholder">—</p>`;
      errorMsg.textContent = "Please enter a city name.";
      return;
    }
    chain = geocodeCity(name).then(city => { currentCity = city; });
  }

  chain
    .then(() => fetchWeather(currentCity, endpoint))
    .then(value => render(currentCity, endpoint, value))
    .catch(err => {
      dataDisplay.innerHTML = `<p class="placeholder">—</p>`;
      errorMsg.textContent = err.message;
    });
}

function setEndpoint(endpoint) {
  activeEndpoint = endpoint;
  navTemp.classList.toggle("active", endpoint === "temperature");
  navHumidity.classList.toggle("active", endpoint === "humidity");

  if (currentCity) loadEndpoint(endpoint);
}

navTemp.addEventListener("click", () => setEndpoint("temperature"));
navHumidity.addEventListener("click", () => setEndpoint("humidity"));

function handleSearch() {
  currentCity = null;
  errorMsg.textContent = "";
  if (cityInput.value.trim()) {
    loadEndpoint(activeEndpoint);
  }
}

searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});