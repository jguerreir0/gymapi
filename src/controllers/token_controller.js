const jwt = require("jsonwebtoken");
const baseModels = require('../../models/base_response_model');

const config = process.env;

const verifyToken = (req, res, errorResponse, response, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return baseModels.logError(errorResponse, response, 403, "A token is required for authentication", res);
    }
    try {
        const decoded = jwt.verify(token, config.JWTKEY);
        req.user = decoded;
    } catch (err) {
        return baseModels.logError(errorResponse, response, 401, "Invalid Token", res);
    }
    return next();
};

module.exports = verifyToken;