"use strict";

const express = require('express');
const nodelib = require('api-nodelib')

const techRouter = new nodelib.ExpressApp(
    'conf-common.json', 
    'conf/api-authenticate.json').router();
const authenticateResource = require('./requesthandler/authenticate-resource');

express()
.use('/', techRouter)
.use('/', authenticateResource)
.listen(9080);
console.log('Authenticate-API started on server 9080');

