// controllers/auth.js

// Importing the jsonwebtoken package for handling JSON Web Tokens (JWTs)
const jwt = require("jsonwebtoken");

// Importing the dotenv package to load environment variables from a .env file
require("dotenv").config();

// Middleware function to verify the authenticity of the token provided in the request header
const verifyToken = (req, res, next) => {

    // console.log("middleware hit", req.headers)

    // Extracting the token from the request header
    const token = req.headers.token;
    // console.log("token", token)
    // Checking if the token exists in the request header
    if (token) {



        // console.log("token", token)
        // Verifying the token using the JWT_SECRET stored in the environment variables
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(403).json("Token is not valid!");
            }

            else {
                req.user = user?.user;
            }
            
            next();


        });
    } else {
        // Returning an unauthorized status and message if no token is provided in the request header
        return res.status(401).json("You are not authenticated!");
    }
};

// Exporting the verifyToken middleware function to be used by other modules
module.exports = { verifyToken };

// const jwt = require("jsonwebtoken")


// module.exports = (req, res, next) => {
//     console.log('auth check req.body.token', req.body.token)
//     try {
//         const token = req.body.token

//         const decoded = jwt.verify(token, process.env.SECRET_KEY)
//         console.log("decoded", decoded)
//         const fullname = decoded.fullname
//         // console.log("userId decoded", userId)
//         if (fullname && fullname.length) {
//             console.log("Authed User : ", decoded.fullname)
//             // req.user = decoded
//             req.locals = decoded
//             // console.log("req.user", req.user)
//             next()

//         } else {
//             res.json({"message": "not auth"})
//         }
//     }
//     catch {
//         console.log("CATCH HIT from auth middleware")
//         // res.status(403),
//     }
// }
