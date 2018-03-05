"use strict";

const express    = require('express');

const technicalResource    = require('./requesthandler/technical-resource');
const authenticateResource = require('./requesthandler/authenticate-resource');

express()
.use('/', technicalResource)
.use('/', authenticateResource)
.listen(9080);
console.log('Authenticate-API started on server 9080');

