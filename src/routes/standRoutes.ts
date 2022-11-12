import {Router} from "express";

import standController from "../controllers/standController";

class StandRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get("/:stand", standController.getStand);
        this.router.get("/:stand/count", standController.getStandCount);
        this.router.get("/:stand/time", standController.getStandRegTimes);
        this.router.get("/:stand/:idNumber", standController.getUserByStand);
        this.router.post("/:stand", standController.create);
        this.router.delete('/:stand/:idNumber', standController.delete);
    }
}

const standRoutes = new StandRoutes();
export default standRoutes.router;