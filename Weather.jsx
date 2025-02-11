import React, { useEffect, useRef, useState } from "react"
import "./weather.css"
import Search_icon from "./assets/search.png"
import Clear_icon from "./assets/clear.png"
import Cloud_icon from "./assets/clouds.png"
import Drizzle_icon from "./assets/drizzle weather.png"
import Rain_icon from "./assets/rain.png"
import Snow_icon from "./assets/snow.png"
import Wind_icon from "./assets/wind.png"
import Humidity_icon from './assets/humidity-icon.png'

const Weather = () => {

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": Clear_icon,
        "01n": Clear_icon,
        "02d": Cloud_icon,
        "02n": Cloud_icon,
        "03d": Cloud_icon,
        "03n": Cloud_icon,
        "04d": Drizzle_icon,
        "04n": Drizzle_icon,
        "09d": Rain_icon,
        "09n": Rain_icon,
        "10d": Rain_icon,
        "10n": Rain_icon,
        "13d": Snow_icon,
        "13n": Snow_icon
    }

    const search = async (city) =>{
        if(city === ""){
            alert("Enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"10158179820ec7fea5a5f3ec49934c17"}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || Clear_icon;
            
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data");

        }
    }

    useEffect(()=>{
        search("Chennai");
    },[])
// °c--> alt+0176
    return (
        <>
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Search" />
                <img src={Search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
            </div>
            {weatherData?<>
            <img src={weatherData.icon} alt="" className="weather-icon" />
            <p className="temperature">{weatherData.temperature}°c</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={Humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={Wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed}km/hr</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            </>:<></>}
        </div>
        </>
    )
}
export default Weather;