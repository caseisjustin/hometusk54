const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'No admin access' });
    }
    next();
};

export default adminMiddleware;