// This module exports an object with a single function "verifyToken" that is used to verify JWT tokens
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import authConfig from "../config/auth.config";

// Middleware function used to verify bearer token present in request header
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        // Extract the actual token part of the Authorization header
        const bearerToken = authHeader.split(" ")[1];
        try {
            // Custom Verification Logic for Bearer Token
            const verifiedData = checkTokenValidity(bearerToken);
            if (verifiedData === null) {
                // Token is invalid
                return res.status(401).send({
                    status: "error",
                    message: "Token is invalid or expired.",
                });
            }

            const { verification_code, email, reset_password } = req.body;

            if (!(verifiedData as JwtPayload)?.email) {
                return res.status(401).send({
                    status: "error",
                    message: "The beare token is invalid.",
                });
            } else {
                // check the existing user from database, using checkExsitingEmail function
            }

            if (
                verification_code &&
                verification_code !== (verifiedData as JwtPayload)?.code
            ) {
                return res.status(401).send({
                    status: "error",
                    message: "The verification code is invalid.",
                });
            }

            if (email && email !== (verifiedData as JwtPayload)?.email) {
                // check the existing user from database, using checkExsitingEmail function

                //
                return res.status(401).send({
                    status: "error",
                    message: "The email is invalid.",
                });
            }

            if (reset_password) {
                if (reset_password !== (verifiedData as JwtPayload)?.password) {
                    return res.status(401).send({
                        status: "error",
                        message: "The password is invalid.",
                    });
                } else {
                    req.body = {
                        email: (verifiedData as JwtPayload)?.email,
                        reset_password: reset_password,
                    };
                }
            }

            return next();
        } catch (err) {
            return res.status(401).json({
                error: "Invalid Bearer Token",
            });
        }
    } else {
        // Request does not contain an Authorization header
        return res.status(401).json({
            error: "Authorization Header not found",
        });
    }
};

const tokenForVerify = (contentForToken: jwt.JwtPayload, expires = {}) => {
    // Generate a new JSON Web Token using the user's email and a secret key provided in authConfig
    const token = jwt.sign(contentForToken, authConfig.secret, expires);
    return token;
};

const comparePassword = (passwordA: string, passwordB: string) => {
    return bcrypt.compareSync(passwordA, passwordB);
};

const encrypt = async (password: string) => {
    return await bcrypt.hash(password, 8);
};

// Helper function used to verify the bearer token using the secret from the authentication config file
const checkTokenValidity = (token: string) => {
    try {
        const decoded = jwt.verify(token, authConfig.secret);
        return decoded;
    } catch (err) {
        console.log(err);
        return null;
    }
};

// Export the verifyToken function as a property of an object
const authJwt = {
    verifyToken,
    tokenForVerify,
    checkTokenValidity,
    comparePassword,
    encrypt,
};

export default authJwt;
