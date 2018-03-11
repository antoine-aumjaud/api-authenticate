"use strict";

const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../conf/api-authenticate.json');

exports.sign = (login, password) => {
    const hashedPassword = this.hashPassword(password)
    if(config.auth[login]
        && config.auth[login].type == "user" 
        && config.auth[login].password === hashedPassword) {
        return createToken(login, 60*10);
    }
    else {
        throw "Can't login with user: " + login;
    }
};
exports.securedSign = (login) => {
    if(config.auth[login] 
        && config.auth[login].type == "app") { 
        return createToken(login, 60);
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

const createToken = (login, timeoutInSeconds) => {
    const cert  = fs.readFileSync(config.privateKey); 
    return jwt.sign(
        { 
            login:        login,
            name:         config.auth[login].name,
            autorization: config.auth[login].autorization 
        }, 
        cert, { expiresIn: timeoutInSeconds, algorithm: 'RS256'});
};