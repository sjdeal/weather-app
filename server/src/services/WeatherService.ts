import { AxiosInstance, AxiosResponse } from "axios";

const axios : AxiosInstance = require("axios");
const API_KEY = "3bd4d77fe48d993325318a977864f9c0";

const WeatherService = {
    getCurrentConditionsByZIPCode: function(zip: string){
        return new Promise((resolve, reject) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEY}`)
            .then((response: AxiosResponse) => {
                resolve(this.formatWeatherData(response.data));
            }).catch((error) => {
                console.log(error.data);
                reject(error);
            });
        });
    },

    getCurrentConditionsByCity: function(city: string){
        return new Promise((resolve, reject) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            .then((response: AxiosResponse) => {
                resolve(this.formatWeatherData(response.data));
            }).catch((error) => {
                console.log(error.data);
                reject(error);
            });
        });
    },

    getCurrentConditions: function(lat: number, lon: number){
        return new Promise((resolve, reject) => {
            let url : string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            axios.get(url)
            .then((response: AxiosResponse) => {
                resolve(this.formatWeatherData(response.data));
            }).catch((error) => {
                console.log(error.data);
                // reject(error);
            });
        });
    },

    formatWeatherData: function(rawData: any){
        let formattedData: any = {
            city: rawData.name,
            condition: rawData.weather[0].main,
            icon: rawData.weather[0].icon,
            iconUrl: `https://openweathermap.org/payload/api/media/file/${rawData.weather[0].icon}.png`,
            humidity: rawData.main.humidity
        };

        //Temperature - current, feels like, low, high - F and C
        formattedData.temp = {
            current: {
                c: Math.round(rawData.main.temp - 273.15),
                f: Math.round((rawData.main.temp * 1.8) - 459.67)
            },
            feelsLike: {
                c: Math.round(rawData.main.feels_like - 273.15),
                f: Math.round((rawData.main.feels_like * 1.8) - 459.67)
            },
            low: {
                c: Math.round(rawData.main.temp_min - 273.15),
                f: Math.round((rawData.main.temp_min * 1.8) - 459.67)
            },
            high: {
                c: Math.round(rawData.main.temp_max - 273.15),
                f: Math.round((rawData.main.temp_max * 1.8) - 459.67)
            }
        };

        //Wind speed and direction
        formattedData.wind = {
            speed: {
                c: Math.round(rawData.wind.speed),
                f: Math.round(rawData.wind.speed * 2.237)
            },
            dir: this.windDegreesToDir(rawData.wind.deg)
        };
        
        return formattedData;
    },

    windDegreesToDir: function(degrees: number){
        if(degrees < 22.5) return 'N';
        if(degrees < 45) return 'NNE';
        if(degrees < 67.5) return 'NE';
        if(degrees < 90) return 'ENE';
        if(degrees < 112.5) return 'E';
        if(degrees < 135) return 'ESE';
        if(degrees < 157.5) return 'SE';
        if(degrees < 180) return 'SSE';
        if(degrees < 202.5) return 'S';
        if(degrees < 225) return 'SSW';
        if(degrees < 247.5) return 'SW';
        if(degrees < 270) return 'WSW';
        if(degrees < 292.5) return 'W';
        if(degrees < 315) return 'WNW';
        if(degrees < 337.5) return 'NW';
        if(degrees < 360) return 'NNW';
    }
};

module.exports = WeatherService;