const fs = require('fs');
const USERS_FILE = 'src/db/users.json';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'twentyporcupinesareintheline';

// authenticate user
exports.authenticateUser = function(username, password) {
	if (!username || !password) {
		return null;
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
		return null;
	} else {
		const payload = {
			admin: user.admin
		};

		const token = jwt.sign(payload, SECRET, {
			expiresIn: '1d'
		});

		return token;
	}
};

// register a new user
exports.registerUser = function(username, password) {
	if (!username || !password) {
		return null;
	}

	const users = JSON.parse(fs.readFileSync(USERS_FILE));

	for (let i = 0; i < users.length; i++) {
		const currentUser = users[i];
		if (currentUser.username === username) {
			// username already exists
			return null;
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
		hash: hash
	};

	users.push(user);
	fs.writeFileSync(USERS_FILE, JSON.stringify(users));
	return user;
};