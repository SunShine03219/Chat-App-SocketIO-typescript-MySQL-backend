import { Request, Response } from "express";
import authJwt from "../middleware/authJwt";
import mysqlModule from "../modules/mysql";
import User from "../models/user.model";

/**
 *
 * @param {*} req
 * @param {*} res
 */
const register = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        // Create a new User
        // If the user was saved successfully, send a success response back to the client along with the newly created user object
        userData.password = await authJwt.encrypt(userData.password);
        const user = await mysqlModule.userDbModule.createUser(userData);

        res.status(200).send({
            status: "success",
            message: "User was registered successfully!",
            user,
        });
    } catch (err) {
        // If there is an unhandled error, send a 500 Internal Server Error response back to the client
        console.log("Error: ", err);
        res.status(500).send({
            status: "error",
            message: "500 Server error",
            error: (err as Error)?.message,
        });
    }
};

/**
 * Sign In
 * @param {*} req      The request object containing the email and password of the user trying to sign in.
 * @param {*} res      The response object used to send a success or error response back to the client.
 * @returns            Nothing
 */
const signin = async (req: Request, res: Response) => {
    try {
        const userData: User = req.body;
        // Find the user with the specified email address in the database
        const user = await mysqlModule.userDbModule.getUser({
            where: { username: userData.username },
        });

        if (!user) {
            // If no user is found with the specified email, send a 401 Not Found response back to the client
            return res.status(400).send({
                stauts: "error",
                message: "User not found",
            });
        }

        // Create a token for user
        const token = authJwt.tokenForVerify({
            username: user.username,
        });

        // Send a success response containing the updated user object
        res.status(200).send({
            status: "success",
            message: "Token for authentication",
            user, // should send only token.
            token,
        });
    } catch (err) {
        // If there is an unhandled error, send a 500 Server Error response back to the client
        res.status(500).send({
            status: "error",
            message: "500 Server error",
            error: (err as Error)?.message,
        });
        console.log(err);
    }
};

const authController = {
    register,
    signin,
};

export default authController;
