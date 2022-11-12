"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.send("API is on /api/people and /api/stand");
    }
}
exports.indexController = new IndexController();
