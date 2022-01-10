const db = require('../db');
const bcrypt = require('bcrypt');

const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError
} = require('../expressError');

const { BCRYPT_WORK_FACTOR } = require('../config');

class User {
	// ** Authenticate user with username, password
	// ** returns { username, first_name, last_name, email, is_admin}
	static async authenticate(username, password) {
		const res = await db.query(
			`SELECT u.username, 
                    u.password, 
                    u.first_name, 
                    u.last_name, 
                    u.email, 
                    u.is_admin, 
                    u.restaurant_id, 
					r.name AS restaurant_name
            FROM users AS u
			JOIN restaurants AS r
			ON u.restaurant_id = r.id
            WHERE username = $1`,
			[ username ]
		);
		const user = res.rows[0];
		if (user) {
			const isValid = await bcrypt.compare(password, user.password);
			if (isValid === true) {
				delete user.password;
				return user;
			}
		}
		throw new UnauthorizedError('Invalid username/password');
	}
	static async register({
		username,
		password,
		firstName,
		lastName,
		email,
		isAdmin
	}) {
		const duplicateCheck = await db.query(
			`SELECT username
            FROM users 
            WHERE username = $1`,
			[ username ]
		);
		if (duplicateCheck.rows[0]) {
			throw new BadRequestError(`Duplicate username: ${username}`);
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(
			`INSERT INTO users 
                (username, 
                 password, 
                 first_name, 
                 last_name, 
                 email, 
                 is_admin)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING username, first_name AS "firstName", 
                    last_name AS "lastName", email, is_admin AS "isAdmin"`,
			[ username, hashedPassword, firstName, lastName, email, isAdmin ]
		);
		const user = result.rows[0];
		return user;
	}
	static async deleteUser(username) {
		const res = await db.query(
			`
        DELETE FROM users WHERE username = $1
        RETURNING username, first_name, last_name
        `,
			[ username ]
		);
		if (!res.rows[0]) return new BadRequestError('User not found');
		return 'User successfully deleted';
	}
}

module.exports = User;
