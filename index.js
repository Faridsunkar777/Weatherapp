const apiKey = "0925198a68ea8681f49e92774990b569"

const weatherDataEl = document.getElementById("weather-data")

const dataEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit" , (event)=>{
    event.preventDefault();

    const cityValue = dataEl.value

    getWeatherData(cityValue)

    console.log(cityValue)
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok){
            throw new error("network response was not ok")
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const details = [
            `feels like: ${Math.round(data.main.feels_like)
            }`,
            `Humidity: ${data.main.humidity}`,
            `Wind speed:${data.wind.speed}`
        ]
        
        weatherDataEl.querySelector(".icon").innerHTML = `  <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;

        weatherDataEl.querySelector(".temperature").textContent= `${temperature}°C`;
        

        weatherDataEl.querySelector(".description").textContent= description;

        weatherDataEl.querySelector(".details").innerHTML= details.map((detail)=>`<div>${detail}</div>`);
        
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";

        weatherDataEl.querySelector(".temperature").textContent= "";
        

        weatherDataEl.querySelector(".description").textContent= "Error occured, try again";

        weatherDataEl.querySelector(".details").innerHTML= "";
    }
}