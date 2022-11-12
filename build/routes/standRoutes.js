"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const standController_1 = __importDefault(require("../controllers/standController"));
class StandRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:stand", standController_1.default.getStand);
        this.router.get("/:stand/count", standController_1.default.getStandCount);
        this.router.get("/:stand/time", standController_1.default.getStandRegTimes);
        this.router.get("/:stand/:idNumber", standController_1.default.getUserByStand);
        this.router.post("/:stand", standController_1.default.create);
        this.router.delete('/:stand/:idNumber', standController_1.default.delete);
    }
}
const standRoutes = new StandRoutes();
exports.default = standRoutes.router;
