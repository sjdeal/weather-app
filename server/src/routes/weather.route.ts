import { Router } from "express";

const express = require("express");
const WeatherService = require("../services/WeatherService");

const router : Router = express.Router();

router.get('/ping', (req, res) => {
    res.json({message: "Ping success"});
});

router.get('/current/zip/:zip', (req, res) => {
    try{
        WeatherService.getCurrentConditionsByZIPCode(req.params.zip)
        .then((response) => {
            res.statusCode = 200;
            res.json(response);
        }).catch((error) => {
            res.statusCode = error.cod;
            res.json(error);
        });
    }catch(e){
        console.log(e);
        res.statusCode = 500;
        res.json({
            cod: 500,
            message: "An unknown error occurred. See the server logs for details."
        });
    }
    
});

router.get('/current/city/:city', (req, res) => {
    try{
        WeatherService.getCurrentConditionsByCity(req.params.city)
        .then((response) => {
            res.statusCode = 200;
            res.json(response);
        }).catch((error) => {
            res.statusCode = error.cod;
            res.json(error);
        });
    }catch(e){
        console.log(e);
        res.statusCode = 500;
        res.json({
            cod: 500,
            message: "An unknown error occurred. See the server logs for details."
        });
    }
});

router.get('/current/geo/:lat/:lon', (req, res) => {
    try{
        WeatherService.getCurrentConditions(Number(req.params.lat), Number(req.params.lon))
        .then((response) => {
            res.statusCode = 200;
            res.json(response);
        }).catch((error) => {
            res.statusCode = error.cod;
            res.json(error);
        });
    }catch(e){
        console.log(e);
        res.statusCode = 500;
        res.json({
            cod: 500,
            message: "An unknown error occurred. See the server logs for details."
        });
    }
});

module.exports = router;