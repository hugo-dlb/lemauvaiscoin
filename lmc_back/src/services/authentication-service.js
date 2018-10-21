const fs = require('fs');
const USERS_FILE = 'src/db/users.json';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../config');

// authenticate user
exports.authenticateUser = function (username, password) {
    if (!username || !password) {
        throw new Error('INVALID_PARAMETERS');
    }

    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    let user = null;

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if (currentUser.username === username && bcrypt.compareSync(password, currentUser.hash)) {
            user = currentUser;
            break;
        }
    }

    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }

    delete user.hash;
    const payload = {
        user: user
    };

    const token = jwt.sign(payload, constants.JWT_SECRET, {
        expiresIn: '1d'
    });

    return token;
};

// register a new user
exports.registerUser = function (username, password) {
    if (!username || !password) {
        throw new Error('INVALID_PARAMETERS');
    }

    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if (currentUser.username === username) {
            // username already exists
            throw new Error('USERNAME_ALREADY_EXISTS');
        }
    }

    let id = 0;
    if (users.length > 0) {
        id = users[users.length - 1].id + 1;
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    const user = {
        id: id,
        username: username,
        hash: hash,
        level: 'USER'
    };

    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));
};

// register a new user
exports.getUserFromRequest = function (req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedPayload = jwt.verify(token, constants.JWT_SECRET);
    return decodedPayload.user;
};
