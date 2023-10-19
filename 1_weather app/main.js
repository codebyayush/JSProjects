const apiKey = "d3b316697e5f410f642d5b8e42ace3ba";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block"; //error msg will be displayed with this line
    document.querySelector(".weather").style.display = "none"; //and this will make weather info hidden.
  } else {
    var data = await response.json();

    console.log(data);

    document.querySelector("#condition").innerHTML = `${data.weather[0].main}`;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    //changing the images according to weather
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "baadal.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "clear.png";
    } else if (data.weather[0].main == "Haze") {
      weatherIcon.src = "haze.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "mist.png";
    }

    document.querySelector(".weather").style.display = "block"; //in css we made weather display none,
    // this will make weather will display when we enter city name
    document.querySelector(".error").style.display = "none";
  }
}

//search button click event
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
