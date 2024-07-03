/// <reference types="../@types/jquery"/>

let disLocation = document.querySelector('.location');
let disCurrent = document.querySelector('.today .custom');
let disTemp_c = document.querySelector('.num span');
let disIcon = document.querySelector('.today .forecast-icon img');
let disDate1 = document.querySelector('.date span');
let disDate2 = document.querySelector('.date i');
let cityInput = document.querySelector('#search');
let disDay = document.querySelector('.today .day');

let disMaxDay1 = document.querySelector('.day1 .degree span');
let disMinDay1 = document.querySelector('.day1 small span');
let disCurrentDay1 = document.querySelector('.day1 .custom');
let disIconDay1 = document.querySelector('.day1 .forecast-icon img');
let disDay1 = document.querySelector('.day1 .day');

let disMaxDay2 = document.querySelector('.day2 .degree span');
let disMinDay2 = document.querySelector('.day2 small span');
let disCurrentDay2 = document.querySelector('.day2 .custom');
let disIconDay2 = document.querySelector('.day2 .forecast-icon img');
let disDay2 = document.querySelector('.day2 .day');

const apiKey = 'b6a84c3c92b24a1897b182154242206';

async function searchCity(cityName) {
    try {
        const searchUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}&days=3`;
        const response = await fetch(searchUrl);
        const searchData = await response.json();

        if (searchData.length === 0) {
            return null;
        }

        const closestCity = searchData[0];
        return closestCity;

    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getCurrentWeather(city) {
    try {
        const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.name},${city.region}&days=3`;
        const response = await fetch(weatherUrl);
        const weatherData = await response.json();
        return weatherData;

    } catch (error) {
        console.error(error);
        return null;
    }
}

async function displayWeather(cityName) {
    try {
        const city = await searchCity(cityName);
        if (!city) {
            return;
        }

        const weatherData = await getCurrentWeather(city);
        if (!weatherData) {
            return;
        }
        display(weatherData);

    } catch (error) {
        console.error(error);
    }
}

function display(data) {
    let day = data.location.localtime;
    let month = getMonth(day.slice(5, 7));

    disLocation.innerHTML = data.location.name;
    disCurrent.innerHTML = data.current.condition.text;
    disTemp_c.innerHTML = data.current.temp_c;
    disIcon.setAttribute('src','https://'+data.current.condition.icon);
    disDay.innerHTML = today
    disDate1.innerHTML = day.slice(8, 10);
    disDate2.innerHTML = month;


    disMaxDay1.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    disMinDay1.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    disCurrentDay1.innerHTML = data.forecast.forecastday[1].day.condition.text;
    disIconDay1.setAttribute('src','https://'+data.forecast.forecastday[1].day.condition.icon);
    disDay1.innerHTML = tomorrow

    disMaxDay2.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    disMinDay2.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    disCurrentDay2.innerHTML = data.forecast.forecastday[2].day.condition.text;
    disIconDay2.setAttribute('src','https://'+data.forecast.forecastday[2].day.condition.icon);
    disDay2.innerHTML = day3

}

function getMonth(monthNum) {
    switch (monthNum) {
        case '01': return 'Jan';
        case '02': return 'Feb';
        case '03': return 'Mar';
        case '04': return 'Apr';
        case '05': return 'May';
        case '06': return 'Jun';
        case '07': return 'Jul';
        case '08': return 'Aug';
        case '09': return 'Sept';
        case '10': return 'Oct';
        case '11': return 'Nov';
        case '12': return 'Dec';
        default: return '';
    }
}

cityInput.addEventListener('keyup', () => {
    const cityName = cityInput.value.trim();
    if (cityName === '') {
        return;
    }
    displayWeather(cityName);
});

displayWeather('Cairo');


let days = new Date();
let day = days.getDay();
let days7 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let today = days7[day];
let tomorrow = days7[(day + 1) % 7];
let day3 = days7[(day + 2) % 7];


$('.mobile-navigation-btn').on('click',function(e){

    $('.mobile-navigation').toggleClass('d-none')
})