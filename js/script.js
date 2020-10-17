// Constants and Variables
const API_KEY = CONFIG.openWeatherAPIKey;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'
let weatherData, userInput

// Cached Element References
const $title = $('#title');
const $temp = $('#temp');
const $index = $('#index');
const $desc = $('#desc');
const $form = $('form');
const $input = $('input[type="text"]');
const $icon = $('#w-icon');

// Event Listeners
$form.on('submit', handleGetData);

// Functions

function handleGetData(event) {
    event.preventDefault();
    userInput = $input.val();
    if(!userInput) return;
    $.ajax(BASE_URL + 'appid=' + API_KEY + '&q=' + userInput + '&units=imperial')
    .then(function(data) {
        weatherData = data;
        render()
    }, function(error) {
        console.log('bad request ', error);
    })
};

function render() {
    $title.text('Weather For: ' + weatherData.name);
    $temp.text('Temperature: ' + weatherData.main.temp);
    $index.text('Feels Like: ' + weatherData.main.feels_like);
    $desc.text('You can expect ' + weatherData.weather[0].description + '');
    var iconcode = weatherData.weather[0].icon;
    $icon.attr('src', "http://openweathermap.org/img/w/" + iconcode + ".png");
};