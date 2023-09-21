import express from "express";
import authController from "../controllers/auth.controller";
import validateRequest from "../middleware/validateRequest";
import verification from "../middleware/verification";

const router = express.Router();

router.post(
    `/auth/register`,
    [
        validateRequest.validateRequestBody(["username"]),
        // verification.checkDuplicateEmail,
    ],
    authController.register,
);

router.post(
    `/auth/login`,
    [
        validateRequest.validateRequestBody(["username"]),
        // verification.checkExsitingEmail,
    ],
    authController.signin,
);

export default router;
