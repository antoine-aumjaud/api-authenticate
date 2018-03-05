"use strict";

const express = require('express');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const signService = require('../service/sign-service.js');

module.exports = express.Router()

//Sign an operation
.post('/auth', urlencodedParser, (req, res) => {
    try {
        const data = signService.sign(req.body.login, req.body.password); 
        res.json({token: data});
    } catch (e) {
        console.log("SECURITY: " + e)
        res.status(401).json({error: e});        
    }
})
.post('/secure/hashPassword', urlencodedParser, (req, res) => {
    const data = signService.hashPassword(req.body.password); 
    res.json({value: data});
})
;
