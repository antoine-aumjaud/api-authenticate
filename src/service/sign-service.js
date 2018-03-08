"use strict";

const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../conf/api-authenticate.json');


//add data 
exports.sign = (login, password) => {
    const hashedPassword = this.hashPassword(password)
    if(config.auth[login]
        && config.auth[login].type == "user" 
        && config.auth[login].password === hashedPassword) { //TODO encode password
        return createToken(login);
    }
    else {
        throw "Can't login with user: " + login;
    }
};
exports.securedSign = (login) => {
    if(config.auth[login] && config.auth[login].type == "app") { 
        return createToken(login);
    }
    else {
        throw "Can't login for app: " + login;
    }
};
exports.hashPassword = (password) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('base64');
};

const createToken = (login) => {
    const cert  = fs.readFileSync(config.privateKey); 
    return jwt.sign(
        { 
            login:        login,
            name:         config.auth[login].name,
            autorization: config.auth[login].autorization 
        }, 
        cert, { expiresIn: 2*60 , algorithm: 'RS256'});
};