import { Request, Response } from "express";

class IndexController{
    public index (req: Request, res: Response) {
        res.send("API is on /api/people and /api/stand")
    }
}

export const indexController = new IndexController();