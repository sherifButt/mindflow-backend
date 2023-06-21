const jwtUtils = require('../../utils/jwtUtils');

const authReadOnlyMiddleware = function (req, res, next) {
    // pass if the request is a GET request
    if (req.method === 'GET') {
        next();
        return;
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwtUtils.verifyToken(token);

        if (!decoded) return res.status(403).json({ message: 'Forbidden' });

        // Set the user object in the request
        req.user = decoded;

        // Call the next middleware
        next();
    } catch (err) {
        next(err)
    }

};

module.exports = authReadOnlyMiddleware;