import db from '../config/db.js';

const createUser = async (userData) => {
    const { username, email, password, status } = userData;
    return db.one(
        'INSERT INTO users (username, email, password, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, email, password, status]
    );
};

const findUserByEmail = async (email) => {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
};

const findUserByUsername = async (username) => {
    return db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
};

const findUserById = async (id) => {
    return db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
};

const updateUserStatus = async (email, status) => {
    return db.none('UPDATE users SET status = $1 WHERE email = $2', [status, email]);
};

const updateUserOtp = async (email, otp) => {
    return db.none('UPDATE users SET otp = $1 WHERE email = $2', [otp, email]);
};

const verifyUserOtp = async (email, otp) => {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1 AND otp = $2', [email, otp]);
};

export default {
    createUser,
    findUserByEmail,
    findUserByUsername,
    findUserById,
    updateUserStatus,
    updateUserOtp,
    verifyUserOtp,
};