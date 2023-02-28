//DEPENDENCIES ==================================================================================
let formEl = document.querySelector("#form");
let userInputTextEl = document.querySelector(".input");
let userInputButtonEl = document.querySelector("#submit-button");
let cityNameEl = document.querySelector("#city-name");
let tempTextEl = document.querySelector("#temp-text");
let windTextEl = document.querySelector("#wind-text");
let humidityTextEl = document.querySelector("#humidity-text");
let weatherPanelsEl = document.querySelector(".weather-panels");

//DATA ==========================================================================================
let apiKey = "4dcc04aad0e12d160288086e453dc2ff";
let city;
//FUNCTIONS =====================================================================================

function submitButtonListener(event){
    event.preventDefault();;
    city = userInputTextEl.value;

    let apiLinkCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    let apiLinkForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    fetch(apiLinkCurrent)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        //date format fix
        let reformatDate = rewriteDate(data.dt);

        //update data for today's date 
        let cityName = data.name + " (" + reformatDate + ")";
        let temp =  ((data.main.temp) - 273.15) * 9/5 + 32;
        let wind = data.wind.speed;
        let humidity = data.main.humidity;

        cityNameEl.innerHTML = cityName;
        tempTextEl.innerHTML = "Temp: " + Math.round(temp * 100) / 100 + '°F';
        windTextEl.innerHTML = "Wind: " + wind + " MPH";
        humidityTextEl.innerHTML = "Humidity: " + humidity + "%";
    });
    
    fetch(apiLinkForecast)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        //clear inner html for previous location 
        weatherPanelsEl.innerHTML = "";

        //update data for the next 5 days
        for(let i = 5; i < 40; i += 8){
            
            let elem = data.list[i];
            let htmlText = 
                           `<div class="panel">
                                <h3 class="date">${rewriteDate(elem.dt)}</h3>
                                <img src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png" alt="weather-icon">
                                <p>Temp: ${Math.round((((elem.main.temp) - 273.15) * 9/5 + 32)*100)/ 100}°F</p>
                                <p>Wind: ${elem.wind.speed} MPH</p>
                                <p>Humidity: ${elem.main.humidity}%</p> 
                            </div>`;

            weatherPanelsEl.insertAdjacentHTML('beforeend', htmlText);
                
        }
        weatherPanelsEl.insertAdjacentHTML('beforeend', "<div></div>");
    });
}

//given a date from the weather api, reformat it mm/dd/yyyy
function rewriteDate(reformatDate){
    let date = new Date(reformatDate * 1000);
    let formattedDate = date.toLocaleDateString('en-US');
    return formattedDate;
}

//USER INTERACTIONS =============================================================================
//when user clicks submit then something happens
formEl.addEventListener('submit', submitButtonListener);


//INITIALIZATIONS ===============================================================================