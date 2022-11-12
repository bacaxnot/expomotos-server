"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PeopleController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const people = yield database_1.default.query('SELECT * FROM people');
            res.json(people);
        });
    }
    ;
    //Get one register
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nick } = req.params;
            const people = yield database_1.default.query('SELECT * FROM people WHERE nickName = ?', [nick]);
            if (people.length) {
                return res.json(people[0]);
            }
            res.status(404).json({ text: "Nickname doesn't exist" });
        });
    }
    ;
    //Create new register
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO people set ?', [req.body]);
            res.json({ message: 'New register created' });
        });
    }
    ;
    //Update register
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nick } = req.params;
            yield database_1.default.query('UPDATE people SET ? WHERE nickName = ?', [req.body, nick]);
            res.json({ message: "Person updated" });
        });
    }
    ;
    //Delete register
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nick } = req.params;
            yield database_1.default.query('DELETE FROM people WHERE nickName = ?', [nick]);
            res.json({ message: 'Person deleted.' });
        });
    }
    ;
}
const peopleController = new PeopleController();
exports.default = peopleController;
