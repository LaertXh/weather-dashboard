//DEPENDENCIES ==================================================================================
let formEl = document.querySelector("#form");
let userInputTextEl = document.querySelector(".input");
let userInputButtonEl = document.querySelector("#submit-button");
let cityNameEl = document.querySelector("#city-name");
let tempTextEl = document.querySelector("#temp-text");
let windTextEl = document.querySelector("#wind-text");
let humidityTextEl = document.querySelector("#humidity-text");

//DATA ==========================================================================================
let apiKey = "4dcc04aad0e12d160288086e453dc2ff";
let city;
//FUNCTIONS =====================================================================================

function submitButtonListener(event){
    event.preventDefault();;
    city = userInputTextEl.value;

    let apiLink = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    fetch(apiLink)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        //date format fix
        let reformatDate = rewriteDate(data.list[0].dt_txt.split("-"));

        //update data for today's date 
        let cityName = data.city.name + " (" + reformatDate + ")";
        let temp =  ((data.list[0].main.temp) - 273.15) * 9/5 + 32;
        let wind = data.list[0].wind.speed;
        let humidity = data.list[0].main.humidity;

        cityNameEl.innerHTML = cityName;
        tempTextEl.innerHTML = "Temp: " + Math.round(temp * 100) / 100 + '°F';
        windTextEl.innerHTML = "Wind: " + wind + " MPH";
        humidityTextEl.innerHTML = "Humidity: " + humidity + "%";

        //update data for the next 5 days
        for(let i = 7; i < 40; i += 8){
            let elem = data.list[i];
            let htmlText = 
                           `<div class="panel">
                                <h3 class="date">${rewriteDate(elem.dt_txt.split("-"))}</h3>
                                <img src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png" alt="weather-icon">
                                <p>Temp: ${((elem.main.temp) - 273.15) * 9/5 + 32}'°F'</p>
                                <p>Wind: ${elem.wind.speed} MPH</p>
                                <p>Humidity: ${elem.main.humidity}%</p> 
                            </div>`
        }


    });
}

//given a date from the weather api, reformat it mm/dd/yyyy
function rewriteDate(reformatDate){
    reformatDate[2] = reformatDate[2].split(" ");
    reformatDate[2] = reformatDate[2][0];
    reformatDate = reformatDate[1] + "/" + reformatDate[2] +"/" + reformatDate[0];
    return reformatDate;
}

//USER INTERACTIONS =============================================================================
//when user clicks submit then something happens
formEl.addEventListener('submit', submitButtonListener);


//INITIALIZATIONS ===============================================================================