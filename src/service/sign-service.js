"use strict";

const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../conf/api-authenticate.json');


//add data 
exports.sign = (login, password) => {
    const hashedPassword = this.hashPassword(password)
    
    if(config.auth[login] && config.auth[login].password == hashedPassword) { //TODO encode password
        const cert  = fs.readFileSync(config.privateKey); 
        return jwt.sign({ autorization: config.auth[login].autorization }, cert, 
            { algorithm: 'RS256'});
    }
    else {
        throw "Can't login with user: " + login;
    }
};
exports.hashPassword = (password) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('base64');
}
