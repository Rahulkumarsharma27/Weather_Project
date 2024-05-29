const apiKey = `be26567890ba02dec01bd0fb15bd9d97`;

async function fetchWaetherData(city){
    try{
   const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if(!response.ok){
        throw new Error("unable to fetch Weather Data");
    }
const data = await response.json();

updateUi(data);
}catch(error){
    console.error(error);
}
}

const cityElem = document.querySelector(".city-name");
const tempElem = document.querySelector(".temp");
const windElem = document.querySelector(".wind-speed");
const humElem = document.querySelector(".humidity");
const visiElem = document.querySelector(".visibility-distance");
const discElem = document.querySelector(".desc-text");
const dateElem = document.querySelector(".date");
const Elem = document.querySelector(".desc i");



function updateUi(data){
  
cityElem.textContent = data.name;
tempElem.textContent =  `${Math.round(data.main.temp)}°C`;
windElem.textContent = `${data.wind.speed}km/h`;
humElem.textContent = `${data.main.humidity}%`;
visiElem.textContent = `${data.visibility/1000}km`;
discElem.textContent = data.weather[0].description;
const currentDate = new Date();
dateElem.textContent = currentDate.toDateString();

const GetWeathericon = getWeatherIconName(data.weather[0].main);
Elem.innerHTML = `<i class="material-icons">${GetWeathericon}</i>` ;
}

const fromElem = document.querySelector(".search-form");

fromElem.addEventListener('submit' , (e) => {
    e.preventDefault();
    const city = document.querySelector(".city-input").value;
    if(city!== ''){
        fetchWaetherData(city);
        document.querySelector(".city-input").value = "";
    }
});


function getWeatherIconName(weatherCondition){
    const iconMap = {
        Clear: "wb-sunny",
        Clouds: "cloud",
        Rain: "tornado",
        Snow: "blizzard",
        Thunderstorm : "flash-on",
         Drizzle : "grain",
         Mist : "cloud",
         Smoke : 'cloud',
         Haze : 'cloud',
         Dust : 'cloud',
         Fog : 'cloud',
         Sand : 'cloud',
         Ash : 'cloud',
         Squall : 'cloud',

        
    };
    return iconMap[weatherCondition] || "help" ;
}