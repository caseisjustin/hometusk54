import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, findUserByUsername, verifyUserOtp, updateUserStatus, updateUserOtp } from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import generateToken from '../utils/generateToken.js';
import logger from '../config/logger.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await findUserByEmail(email);

        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await createUser({
            username,
            email,
            password: hashedPassword,
            status: 'pending',
        });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await sendEmail({
            to: email,
            subject: 'OTP for Account Verification',
            text: `Your OTP is ${otp}`,
        });

        await updateUserOtp(email, otp);

        res.status(201).json({ message: 'User created and OTP sent to email' });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await verifyUserOtp(email, otp);

        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP or email' });
        }

        await updateUserStatus(email, 'active');

        res.status(200).json({ message: 'Verification successful and user activated' });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user.id);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
