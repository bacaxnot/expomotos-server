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
class StandController {
    //Get stand registers
    getStand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stand } = req.params;
            const standRegs = yield database_1.default.query('SELECT * FROM ' + [stand]);
            return res.json(standRegs);
        });
    }
    ;
    //Get stand register times
    getStandRegTimes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stand } = req.params;
            const standRegs = yield database_1.default.query('SELECT standRegDate FROM ' + [stand]);
            return res.json(standRegs);
        });
    }
    ;
    //Get stand register count
    getStandCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stand } = req.params;
            const standRegs = yield database_1.default.query('SELECT COUNT(idNumber) AS regCount FROM ' + [stand]);
            return res.json(standRegs[0]);
        });
    }
    ;
    //Get user info by stand and idNumber
    getUserByStand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stand } = req.params;
            const { idNumber } = req.params;
            const person = yield database_1.default.query('SELECT * FROM ' + [stand] + ' WHERE idNumber = ' + "?", [idNumber]);
            if (person.length) {
                return res.json(person[0]);
            }
            else {
                return res.status(404).json({ message: "No existe un registro asociado a ese número de identificación" });
            }
        });
    }
    ;
    //Create new register in stand
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stand } = req.params;
            const newRegStandVerification = yield database_1.default.query('SELECT * FROM ' + [stand] + ' WHERE idNumber = ' + "?", [req.body.idNumber]);
            const newRegIdVerification = yield database_1.default.query('SELECT * from people WHERE idNumber = ?', [req.body.idNumber]);
            const standCount = yield database_1.default.query('SELECT standCount FROM people WHERE idNumber = ?', [req.body.idNumber]);
            let finalStatus = { message: "Registro exitoso", global: true, stand: false, regStandCount: NaN };
            if (!(newRegIdVerification.length)) {
                res.status(404);
                finalStatus.message = "No fue posible realizar el registro";
                finalStatus.global = false;
            }
            if (newRegStandVerification.length) {
                res.status(404);
                finalStatus.message = "No fue posible realizar el registro";
                finalStatus.stand = true;
            }
            if (finalStatus.global && !finalStatus.stand) {
                let standCountUpdate = standCount[0].standCount + 1;
                yield database_1.default.query('INSERT INTO ' + [stand] + ' SET ?', [req.body]);
                yield database_1.default.query('UPDATE people SET standCount = ? WHERE idNumber = ?', [standCountUpdate, req.body.idNumber]);
                finalStatus.regStandCount = standCountUpdate;
            }
            return res.json(finalStatus);
        });
    }
    ;
    //Delete user by stand and idNumber
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stand } = req.params;
            const { idNumber } = req.params;
            yield database_1.default.query('DELETE FROM ' + [stand] + ' WHERE idNumber = ' + "?", [idNumber]);
            res.json({ message: 'Person deleted.' });
        });
    }
    ;
}
const standController = new StandController();
exports.default = standController;
