// Se define una constante apiKey que almacena la clave de la API de OpenWeatherMap.
const apiKey = "1ab5c952c1af445d9ecba1e4b65066b8";

// Se define una constante apiUrl que almacena la URL base de la API de OpenWeatherMap,
// incluyendo parámetros de consulta para obtener datos en unidades métricas y para la ciudad.
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Se obtienen referencias a elementos HTML en la página utilizando selectores CSS.
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Se define una función asincrónica checkWeather(city) que busca y muestra el clima de una ciudad.
async function checkWeather(city) {
  
  // Se realiza una solicitud a la API de OpenWeatherMap concatenando la URL base, la ciudad y la clave de API.
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // Se verifica el código de estado de la respuesta. Si es 404, se muestra un mensaje de error.
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // Si la solicitud es exitosa, se analiza la respuesta como JSON.
    const data = await response.json();

    // Se actualizan elementos HTML en la página con datos climáticos.
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "ºC";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

    // Según el estado del clima, se selecciona y muestra un ícono correspondiente.
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "img/minst.png";
    }

    console.log(data);

    // Se muestra la información del clima y se oculta el mensaje de error.
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Se añade un oyente de evento al botón de búsqueda para invocar checkWeather cuando se hace clic.
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  searchBox.value = ""; // Se borra el campo de búsqueda después de realizar la consulta.
});

// Se añade un oyente de evento al campo de entrada de búsqueda para invocar checkWeather cuando se presiona Enter.
searchBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
    searchBox.value = ""; // Se borra el campo de búsqueda después de realizar la consulta.
  }
});
