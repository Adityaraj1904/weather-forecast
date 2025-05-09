let weather = {
    "apikey": "", // Your API Key
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apikey)
        .then(response => response.json())
        .then(data => this.displayWeather(data))
        .catch(error => console.error("Error fetching data:", error)); // Catch any errors
    },

    displayWeather: function (data) {
        if (data.cod !== 200) {
            alert("City not found!"); // Show an error if the city is invalid
            return;
        }
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

// Event Listeners for Search Functionality
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Fetch default city weather on load
weather.fetchWeather("Dhanbad");
