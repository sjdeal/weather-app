import { Router } from "express";

const express = require("express");
const WeatherService = require("../services/WeatherService");

const router : Router = express.Router();

router.get('/ping', (req, res) => {
    res.json({message: "Ping success"});
});

router.get('/current/zip/:zip', (req, res) => {
    WeatherService.getCurrentConditionsByZIPCode(req.params.zip)
    .then((response) => {
        res.json(response);
        res.statusCode = 200;
    });
});

router.get('/current/city/:city', (req, res) => {
    WeatherService.getCurrentConditionsByCity(req.params.city)
    .then((response) => {
        res.json(response);
        res.statusCode = 200;
    });
});

router.get('/current/geo/:lat/:lon', (req, res) => {
    WeatherService.getCurrentConditions(Number(req.params.lat), Number(req.params.lon))
    .then((response) => {
        res.json(response);
        res.statusCode = 200;
    });
});

module.exports = router;