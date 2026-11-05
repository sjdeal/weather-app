const express = require("express");

const router = express.Router();
const WeatherService = require("../services/WeatherService");

router.get('/ping', (req, res) => {
    res.json({message: "Ping success"});
});

router.get('/current/zip/:zip', (req, res) => {
    WeatherService.getCurrentConditionsByZIPCode(req.params.zip)
    .then((response) => {
        res.json(response)
    });
});

router.get('/current/city/:city', (req, res) => {
    WeatherService.getCurrentConditionsByCity(req.params.city)
    .then((response) => {
        res.json(response)
    });
});

router.get('/current/geo/:lat/:lon', (req, res) => {
    //TODO: this isn't working for some reason
    WeatherService.getCurrentConditions(Number(req.params.lat), Number(req.params.lon))
    .then((response) => {
        res.json(response)
    });
});

module.exports = router;