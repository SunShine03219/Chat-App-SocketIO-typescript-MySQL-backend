import { Application, Request, Response } from "express";

import authRoutes from "./auth.routes";
import roomRoutes from "./room.routes";

const initializRoutes = (app: Application) => {
    //
    // Configure default route handlers for GET and POST requests
    app.post(`/api`, (req: Request, res: Response) => {
        res.json({ message: `Welcome to Chatting application.` });
    });

    app.use(`/api`, [authRoutes, roomRoutes]);
};

const routes = {
    initializRoutes,
};
export default routes;
