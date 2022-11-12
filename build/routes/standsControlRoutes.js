"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const standsControlController_1 = __importDefault(require("../controllers/standsControlController"));
class PeopleRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", standsControlController_1.default.list);
        this.router.get("/:nick", standsControlController_1.default.getOne);
        this.router.post("/", standsControlController_1.default.create);
        this.router.put('/:nick', standsControlController_1.default.update);
        this.router.delete('/:nick', standsControlController_1.default.delete);
    }
}
const peopleRoutes = new PeopleRoutes();
exports.default = peopleRoutes.router;
