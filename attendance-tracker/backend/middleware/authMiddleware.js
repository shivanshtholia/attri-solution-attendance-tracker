const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    try {

        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                message: "Access Denied"
            });
        }

        // Bearer token ko alag karo
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = auth;