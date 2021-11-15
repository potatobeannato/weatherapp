const api ={
    key:'a77ff500c4b4e290fc94dec6da84c6f3',
    base:"http://api.openweathermap.org/data/2.5/"
}

// this is data that will be use for the search box
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getData(searchbox.value);
    }
}

// to call upon the api and get the information to transer to another function that is "displayData"
function getData (query){
    fetch(`${api.base}weather?q=${query}&units=imperial&&appid=${api.key}`)
        .then(weather =>{
           return weather.json();
        }).then(displayData);
    
}

// to call upon the date automatically when a city is being search and will be inpout in the "addDate"
function addDate(d){
    let months = ["January", "Febrauary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`;
}


// core of the program that will update the "getData" and the searchbox
function displayData(weather){
    
    // to search for the weather of a city automatically and call upon the city name and country
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // geolocation of the search city
    let country = document.querySelector('.location .country');
    country.innerText =  `Longtitude and Latitude: ${weather.coord.lat + 'N'  + weather.coord.lon + 'E'}`

    // automatic update on most current date and give it the appropriate name from the "addDate"
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = addDate(now);

    //returning the right temperature base on farenheit by using the imperial system from the "getData"
    let temp = document.querySelector('.current .temp','thermometer');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;
    
    // getting the weather element - cloudy, rainy, sunny...etc
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = `${weather.weather[0].main}`;
     
    // giving the hi and low of the day
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;

    // returning the humidity
    let humidity = document.querySelector('.current .humidity');
    humidity.innerHTML = `Humidity: ${weather.main.humidity}%`;
    

}




