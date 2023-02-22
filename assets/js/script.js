//DEPENDENCIES ==================================================================================
let userInputTextEl = document.querySelector(".input");
let userInputButtonEl = document.querySelector("#submit-button");
let cityNameEl = document.querySelector("#city-name");
let tempTextEl = document.querySelector("#temp-text");
let windTextEl = document.querySelector("#wind-text");
let humidityTextEl = document.querySelector("#humidity-text");

//DATA ==========================================================================================
let apiKey = "37cf2af51487d6436e871e44f1db13c6";
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

        //update data for today's date 
        let cityName = data.city.name;
        let temp =  ((data.list[0].main.temp) - 273.15) * 9/5 + 32;
        let wind = data.list[0].wind.speed;
        let humidity = data.list[0].main.humidity;

        cityNameEl.innerHTML = cityName;
        tempTextEl.innerHTML = "Temp: " + Math.round(temp * 100) / 100 + '°F';
        windTextEl.innerHTML = "Wind: " + wind + " MPH";
        humidityTextEl.innerHTML = "Humidity: " + humidity + "%";


    });
}

//USER INTERACTIONS =============================================================================
//when user clicks submit then something happens
userInputButtonEl.addEventListener('click', submitButtonListener);


//INITIALIZATIONS ===============================================================================