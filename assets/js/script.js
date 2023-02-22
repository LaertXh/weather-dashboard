//DEPENDENCIES ==================================================================================
let userInputTextEl = document.querySelector('.input');
let userInputButtonEl = document.querySelector('#submit-button');

//DATA ==========================================================================================
let apiKey = "37cf2af51487d6436e871e44f1db13c6";
let city;
//FUNCTIONS =====================================================================================

function submitButtonListener(event){
    event.preventDefault();;
    city = userInputTextEl.value;

    let apiLink = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    fetch(apiLink);
}

//USER INTERACTIONS =============================================================================
//when user clicks submit then something happens
userInputButtonEl.addEventListener('click', submitButtonListener);


//INITIALIZATIONS ===============================================================================