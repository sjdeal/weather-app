import { AxiosInstance, AxiosResponse } from "axios";

const axios : AxiosInstance = require("axios");
const API_KEY = "3bd4d77fe48d993325318a977864f9c0";

const WeatherService = {
    //TODO: replace with api calls that don't need to do geo lookup
    getCurrentConditionsByZIPCode: function(zip: string){
        return new Promise((resolve, reject) => {
            this.getLatLongByZIPCode(zip)
            .then((response: any) => {
                this.getCurrentConditions(response.lat, response.lon)
                .then((weather_response: any) => {
                    resolve(weather_response);
                })
            });
        });
    },

    getCurrentConditionsByCity: function(city: string){
        return new Promise((resolve, reject) => {
            this.getLatLongByCity(city)
            .then((response: any) => {
                this.getCurrentConditions(response.lat, response.lon)
                .then((weather_response: any) => {
                    resolve(weather_response);
                })
            });
        });
    },

    getCurrentConditions: function(lat: number, lon: number){
        return new Promise((resolve, reject) => {
            console.log(lat);
            console.log(lon);
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            .then((response: AxiosResponse) => {
                //TODO: organize the data returned
                resolve(response.data);
            }).catch((error) => {
                console.log(error.data);
                // reject(error);
            });
        })
    },

    getLatLongByZIPCode: function(zip: string){
        return new Promise((resolve, reject) => {
            axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`)
            .then((response: AxiosResponse) => {
                resolve(response.data);
            })
        })
    },

    getLatLongByCity: function(city: string){
        return new Promise((resolve, reject) => {
            axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
            .then((response: AxiosResponse) => {
                console.log("here");
                console.log(response.data);
                resolve(response.data[0]);
            })
        })
    }
};

module.exports = WeatherService;