import {Router} from "express";

import peopleController from "../controllers/peopleController";

class PeopleRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get("/", peopleController.list);
        this.router.get("/count", peopleController.getCount);
        this.router.get("/resume", peopleController.getResume);
        this.router.get("/time", peopleController.getRegTimes);
        this.router.get("/byid/:idNumber", peopleController.getById);
        this.router.get("/byemail/:email", peopleController.getByEmail);
        this.router.post("/", peopleController.create);
        this.router.post("/auth", peopleController.auth);
        this.router.post("/auth/contest", peopleController.authContest);
        this.router.put('/byid/:idNumber', peopleController.update);
        this.router.delete('/:idNumber', peopleController.delete);
    }
}

const peopleRoutes = new PeopleRoutes();
export default peopleRoutes.router;