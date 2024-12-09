const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log("Authenticated User:", req.user); 
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const authorize = (role) => (req, res, next) => {
    console.log("User Role:", req.user.role); 
    console.log("Required Role:", role);
    if (!req.user.role.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
};
module.exports = { authenticate, authorize };

// req.user.role !== role
