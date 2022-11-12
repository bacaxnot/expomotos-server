"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const peopleController_1 = __importDefault(require("../controllers/peopleController"));
class PeopleRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", peopleController_1.default.list);
        this.router.get("/count", peopleController_1.default.getCount);
        this.router.get("/resume", peopleController_1.default.getResume);
        this.router.get("/time", peopleController_1.default.getRegTimes);
        this.router.get("/byid/:idNumber", peopleController_1.default.getById);
        this.router.get("/byemail/:email", peopleController_1.default.getByEmail);
        this.router.post("/", peopleController_1.default.create);
        this.router.post("/auth", peopleController_1.default.auth);
        this.router.post("/auth/contest", peopleController_1.default.authContest);
        this.router.put('/byid/:idNumber', peopleController_1.default.update);
        this.router.delete('/:idNumber', peopleController_1.default.delete);
    }
}
const peopleRoutes = new PeopleRoutes();
exports.default = peopleRoutes.router;
