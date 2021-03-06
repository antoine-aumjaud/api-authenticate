"use strict";

const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../conf/api-authenticate.json');

exports.userSign = (login, password) => {
    const hashedPassword = this.hashPassword(password)
    if(config.auth[login]
    && config.auth[login].type == "user" 
    && config.auth[login].password === hashedPassword) {
        return createToken(login, 60*10); // 10 minutes
    }
    else {
        throw "Can't login with user: " + login;
    }
};
exports.renewUserSign = (login) => {
    if(config.auth[login] 
    && config.auth[login].type == "user") { 
        return createToken(login, 60*10);  // 10 minutes
    }
    else {
        throw "Can't renew token for user: " + login;
    }
};
exports.appSign = (login) => {
    if(config.auth[login] 
    && config.auth[login].type == "app") { 
        return createToken(login, 60);  // 1 minutes
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