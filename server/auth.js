const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];

    if (!token) {
        return res.status(401);
    }


    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            res.status(401);
        }
        req.user = user;
        next();
    });
};

module.exports = auth;
