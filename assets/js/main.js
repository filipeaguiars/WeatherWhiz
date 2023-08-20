//import axios from 'axios';

let cityInput = document.querySelector('.search');
const sendBtn = document.querySelector('.submit');
let container = document.querySelector('.container')
let result = document.getElementById('resultado');
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let humidity = document.querySelector('.weather-details .humidity span');
let wind = document.querySelector('.weather-details .wind span');
let weatherBox = document.querySelector('.weather');
let weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.notfound');

    cityInput.addEventListener('keypress', function(e){
        let cityName = cityInput.value;
        if(e.keyCode === 13){
        fetchDataFromApi(cityName);
    }
})


    sendBtn.addEventListener('click', function(e){
        if(!cityInput.value) return;

        let cityName = cityInput.value;

        fetchDataFromApi(cityName);        
    })

function fetchDataFromApi(cityName){

    const apiKey = 'c883f0ef28f441c867b5f69c2143e996';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;


    fetch(url)
    .then(response => response.json())
    .then(json => {
        if(json.cod === '404'){
            container.style.height = '500px';
            error.style.display = 'block';
            error.classList.add('fadeIn');
            return;
        }
        error.style.display = 'none';
        error.classList.remove('fadeIn');
        showForecast(json);
    })
    .catch(e => {
        if (e.response) {
            console.log(`Error: ${e.response.data.cod}. ${e.response.data.message}`);
        }
    });
}

function showForecast(json) {
    console.log(json);
    cleanResults();
    search.value = '';
    search.placeholder = `${json.name}, ${json.sys.country}`;
    container.style.height = '450px';
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    
    temperature.innerText = json.main.temp + ' °C ';
    description.innerText = json.weather[0].description;
    humidity.innerText = json.main.humidity + '%';
    wind.innerText = json.wind.speed + 'km/h';
    
}

function cleanResults(){
    weatherBox.classList.remove('fadeIn');
    weatherDetails.classList.remove('fadeIn');
    container.style.height = '150px';
}