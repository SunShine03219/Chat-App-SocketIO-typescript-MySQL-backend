import { NextFunction, Request, Response } from "express";
import userDbModule from "../modules/mysql/user.module";

const checkDuplicateEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email } = req.body;

        const user = await userDbModule.getUser({ where: { email: email } });
        if (user) {
            return res.status(402).send({
                status: "error",
                message: "Failed! Email is already in use!",
            });
        }
        next();
    } catch (err: unknown) {
        res.status(500).send({
            status: "error",
            message: "500 Server Error",
            error: (err as Error)?.message,
        });
    }
};

const checkExsitingEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email } = req.body;
        const user = await userDbModule.getUser({ where: { email: email } });
        if (!user) {
            return res.status(402).send({
                status: "error",
                message: "The user is not existing.",
            });
        }
        req.body.user = user;
        next();
    } catch (err: unknown) {
        res.status(500).send({
            status: "error",
            message: "500 Server Error",
            error: (err as Error)?.message,
        });
    }
};

const verification = {
    checkDuplicateEmail,
    checkExsitingEmail,
};

export default verification;
