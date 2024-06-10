import logger from '../config/logger.js';

const errorMiddleware = (err, req, res, next) => {
    logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(500).json({ message: 'Server error' });
};

export default errorMiddleware;