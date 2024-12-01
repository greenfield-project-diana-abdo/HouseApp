const jwt = require ("jsonwebtoken");

async function verifyToken (req, res, next) {
    let authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).send ({
            msg: "Unauthorized user, Token not found"
        });
    }

    // Split and get the token - will split token for two parts, with separator "space" and will retrieve 1st index value
    let clientToken = authHeader.split (" ")[1];

    try {
        // Verification of token
        let decoded = jwt.verify(clientToken, process.env.SECRET_KEY, {expiresIn: "1h"});

        // console.log(decoded);
        if (!decoded) {
            return res.send ({
                msg: "Invalid token"
            });
        }
        // Attach the decoded token data to the request object
        req.user = decoded;

        //Call the next middleware
        next ();
        
    } catch (error) {
        console.log("Token verification error:", error);

        // Send an appropriate error response
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ msg: "Token has expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(403).send({ msg: "Malformed or invalid token" });
        } else {
            return res.status(500).send({
                msg: "An error occurred during token verification",
                error,
            });
        }
    }
}

module.exports = verifyToken;