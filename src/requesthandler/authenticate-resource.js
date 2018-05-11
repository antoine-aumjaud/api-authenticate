"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const signService = require('../service/sign-service.js');

module.exports = express.Router()

//Sign an operation
.post('/userSign', urlencodedParser, (req, res) => {
    try {
        const data = signService.userSign(req.body.login, req.body.password); 
        res.json({token: data});
    } catch (e) {
        console.log("SECURITY: " + e)
        res.status(401).json({error: e});        
    }
})
.post('/secure/appSign', urlencodedParser, (req, res) => {
    const data = signService.appSign(req.body.login); 
    res.json({token: data});
})
.post('/secure/renewUserSign', urlencodedParser, (req, res) => {
    const data = signService.renewUserSign(req.body.login); 
    res.json({token: data});
})
.post('/secure/hashPassword', urlencodedParser, (req, res) => {
    const data = signService.hashPassword(req.body.password); 
    res.json({value: data});
})
;
