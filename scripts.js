// 'https://api.openweathermap.org/data/2.5/weather?q=berlin&APPID=d93a708ed25da5de9580ecb06bc0c8eb&units=metric'
const apiKey = 'd93a708ed25da5de9580ecb06bc0c8eb';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const maindiv = document.querySelector('.main');
const othersdiv = document.querySelector('.others');
const landing = document.querySelector('.landing');
const input = document.querySelector('#searchInput');
const search = document.querySelector('#searchButton');
const cityName = document.querySelector('#cityName');
const desc = document.querySelector('#desc');
const temp = document.querySelector('#temp');
const image = document.querySelector('#weatherImage');
const other = {
    pressure: document.getElementById('pressure'),
    humidity: document.querySelector('#humidity'),
    grndLevel: document.querySelector('#grndLevel'),
    windSpeed: document.querySelector('#windSpeed'),
    visibility: document.querySelector('#visibility')
}
const images = {
    clouds: 'https://cdn-icons-png.flaticon.com/128/414/414927.png',
    Thunderstorm: 'https://cdn-icons-png.flaticon.com/128/4724/4724103.png',
    Drizzle: 'https://cdn-icons-png.flaticon.com/128/2059/2059322.png',
    Rain: 'https://cdn-icons-png.flaticon.com/128/4724/4724094.png',
    Snow: 'https://cdn-icons-png.flaticon.com/128/7334/7334205.png',
    Mist: 'https://cdn-icons-png.flaticon.com/128/4005/4005817.png',
    Smoke: 'https://cdn-icons-png.flaticon.com/128/11717/11717521.png',
    Haze: 'https://cdn-icons-png.flaticon.com/128/4151/4151022.png',
    Dust: 'https://cdn-icons-png.flaticon.com/128/10344/10344630.png',
    Fog: 'https://cdn-icons-png.flaticon.com/128/3431/3431306.png',
    Sand: 'https://cdn-icons-png.flaticon.com/128/9210/9210018.png',
    Ash: 'https://cdn-icons-png.flaticon.com/128/4724/4724103.png',
    Squall: 'https://cdn-icons-png.flaticon.com/128/15622/15622034.png',
    Tornado: 'https://cdn-icons-png.flaticon.com/128/491/491195.png',
    Clear: 'https://cdn-icons-png.flaticon.com/128/8030/8030067.png'
}

const fetchWeather = async (city) => {
    
        const response = await fetch(apiUrl + `?q=${city}` + `&APPID=${apiKey}` + `&units=metric`);
        if(response.ok){
            const data = await response.json();
            console.log(data);
            maindiv.classList.remove('hidden');
            othersdiv.classList.remove('hidden');
            landing.classList.add('hidden');
            changedata(data);
        }else{
            console.error('Error fetching weather data:', response.statusText);
        }
}

const changedata = (data) => {
    cityName.innerHTML = data.name+ ', ' + data.sys.country;
    desc.innerHTML = data.weather[0].description;
    temp.innerHTML = `${Math.round(data.main.temp)}°C`;
    other.pressure.innerHTML = `${data.main.pressure} hPa`;
    other.humidity.innerHTML = `${data.main.humidity}%`;
    other.grndLevel.innerHTML = `${data.main.grnd_level} hPa`;
    other.visibility.innerHTML = `${data.visibility / 1000} km`;
    other.windSpeed.innerHTML = `${data.wind.speed} m/s`;
    const currentWeather = `${data.weather[0].icon}`;
    // image.src = `https://openweathermap.org/img/wn/${currentWeather}@2x.png` // Default to Clear if not found
    const imageType = data.weather[0].main;
    switch(imageType) {
        case 'Clouds':
            image.src = images.clouds;
            break;
        case 'Clear':
            image.src = images.Clear;
            break;
        case 'Rain':
            image.src = images.Rain;
            break;
        case 'Snow':
            image.src = images.Snow;
            break;
        case 'Thunderstorm':
            image.src = images.Thunderstorm;
            break;  
        case 'Drizzle':
            image.src = images.Drizzle;
            break;
        case 'Mist':
            image.src = images.Mist;
            break;  
        case 'Smoke':
            image.src = images.Smoke;
            break;  
        case 'Haze':    
            image.src = images.Haze;
            break;      
        case 'Dust':    
            image.src = images.Dust;
            break;  
        case 'Fog':
            image.src = images.Fog;
            break;
        case 'Sand':
            image.src = images.Sand;
            break; 
        case 'Squall':  
            image.src = images.Squall;
            break;
        case 'Tornado':
            image.src = images.Tornado;
            break;
                        
        default:
            image.src = `https://openweathermap.org/img/wn/${currentWeather}@2x.png` || images.Clear; // Default to Clear if not found
    }

}


search.addEventListener('click', () => {    
    if(input.value.trim() !== '') {
        fetchWeather(input.value.trim());
    }else{
        alert('Please enter a city name');
    }

})

(() => {
    othersdiv.classList.add('hidden');
    maindiv.classList.add('hidden');
})();