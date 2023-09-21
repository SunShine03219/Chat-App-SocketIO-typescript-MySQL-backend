// This module exports an object whose properties are functions that validate the request body for various endpoints

import { NextFunction, Request, Response } from "express";

// Checks that all required fields are present in the request body for the endpoint
const validateRequestBody =
    (requiredParams: string[], optionalPrams: string[] = []) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestParams = req.body;
            checkFields(
                requiredParams,
                optionalPrams,
                requestParams,
                res,
                next,
            );
        } catch (err) {
            res.status(500).send({
                status: "error",
                message: `500 Server Error`,
                error: err,
            });
        }
    };

// Checks that all required fields are present in the request param for the endpoint
const validateRequestParams =
    (requiredParams: string[], optionalPrams: string[] = []) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestParams = req.params;
            checkFields(
                requiredParams,
                optionalPrams,
                requestParams,
                res,
                next,
            );
        } catch (err) {
            res.status(500).send({
                status: "error",
                message: `500 Server Error`,
                error: err,
            });
        }
    };

// Helper function used to check if required fields are present in requestParams
const checkFields = (
    requiredParams: string[],
    optionalParams: string[],
    requestParams: object,
    res: Response,
    next: NextFunction,
) => {
    try {
        let errorOccurred = null;

        requiredParams.forEach((field) => {
            if (!Object.keys(requestParams).includes(field)) {
                errorOccurred = field;
            }
        });

        if (errorOccurred) {
            return res.status(400).send({
                status: "error",
                message: `${errorOccurred} is required`,
            });
        }

        errorOccurred = null;
        Object.keys(requestParams).forEach((key) => {
            if (![...requiredParams, ...optionalParams].includes(key)) {
                errorOccurred = key;
            }
        });

        if (errorOccurred) {
            return res.status(400).send({
                status: "error",
                message: `${errorOccurred} is invalid.`,
            });
        }

        next();
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: `500 Server Error`,
            error: err,
        });
    }
};

// Export all functions as an object
const validateRequest = {
    validateRequestBody,
    validateRequestParams,
};

export default validateRequest;
