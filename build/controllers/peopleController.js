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
    //Get all registers
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const people = yield database_1.default.query('SELECT * FROM people;');
            res.json(people);
        });
    }
    ;
    //Get all register times
    getRegTimes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const people = yield database_1.default.query('SELECT regDate FROM people;');
            res.json(people);
        });
    }
    ;
    //Get all contestants
    getContestants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const people = yield database_1.default.query('SELECT * FROM people WHERE standCount = 10;');
            res.json(people);
        });
    }
    ;
    //Get all registers count
    getResume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resume = yield database_1.default.query('SELECT ' +
                '(SELECT COUNT(*) from people) AS totalReg, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 0) AS standCount0, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 1) AS standCount1, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 2) AS standCount2, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 3) AS standCount3, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 4) AS standCount4, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 5) AS standCount5, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 6) AS standCount6, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 7) AS standCount7, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 8) AS standCount8, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 9) AS standCount9, ' +
                '(SELECT COUNT(*) from people WHERE standCount = 10) AS standCount10, ' +
                '(SELECT COUNT(*) from auteco) AS autecoReg, ' +
                '(SELECT COUNT(*) from people WHERE favBrand = "auteco") AS autecoLovers, ' +
                '(SELECT COUNT(*) from akt) AS aktReg, ' +
                '(SELECT COUNT(*) from people WHERE favBrand = "akt") AS aktLovers, ' +
                '(SELECT COUNT(*) from bajaj) AS bajajReg, ' +
                '(SELECT COUNT(*) from people WHERE favBrand = "bajaj") AS bajajLovers, ' +
                '(SELECT COUNT(*) from enfield) AS enfieldReg, ' +
                '(SELECT COUNT(*) from people WHERE favBrand = "royal enfield") AS enfieldLovers, ' +
                '(SELECT COUNT(*) from hero) AS heroReg, ' +
                '(SELECT COUNT(*) from people WHERE favBrand = "hero") AS heroLovers, ' +
                '(SELECT COUNT(*) from honda) AS hondaReg, ' +
                '(SELECT COUNT(*) from people WHERE favBrand = "honda") AS hondaLovers, ' +
                '(SELECT COUNT(*) from niu) AS niuReg, ' +
                '(SELECT COUNT(*) from people WHERE favBrand = "niu") AS niuLovers, ' +
                '(SELECT COUNT(*) from suzuki) AS suzukiReg, ' +
                '(SELECT COUNT(*) from people WHERE favBrand = "suzuki") AS suzukiLovers, ' +
                '(SELECT COUNT(*) from yamaha) AS yamahaReg, ' +
                '(SELECT COUNT(*) from people WHERE favBrand = "yamaha") AS yamahaLovers, ' +
                '(SELECT COUNT(*) from transito) AS transitoReg;');
            res.json(resume[0]);
        });
    }
    ;
    //Get resume
    getCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const people = yield database_1.default.query('SELECT COUNT(entryNumber) AS regCount FROM people');
            res.json(people[0]);
        });
    }
    ;
    //Get one register by idNumber
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idNumber } = req.params;
            const people = yield database_1.default.query('SELECT * FROM people WHERE idNumber = ?', [idNumber]);
            if (people.length) {
                return res.json(people[0]);
            }
            else {
                res.status(404);
                return res.json({ message: "No existe un registro asociado a ese número de identificación." });
            }
        });
    }
    ;
    //Get one register by email
    getByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const people = yield database_1.default.query('SELECT * FROM people WHERE email = ?', [email]);
            if (people.length) {
                return res.json(people[0]);
            }
            else {
                res.status(404);
                return res.json({ message: "No existe un registro asociado a ese email." });
            }
        });
    }
    ;
    //Create new register
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRegIdVerification = yield database_1.default.query('SELECT * from people WHERE idNumber = ?', [req.body.idNumber]);
            let finalStatus = { message: "Registro exitoso", idNumber: false };
            //Verifying idNumber and email
            if (newRegIdVerification.length) {
                res.status(404);
                finalStatus.message = "No fue posible realizar el registro";
                finalStatus.idNumber = true;
            }
            else {
                yield database_1.default.query('INSERT INTO people SET ?', [req.body]);
            }
            return res.json(finalStatus);
        });
    }
    ;
    //Update register
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idNumber } = req.params;
            yield database_1.default.query('UPDATE people SET ? WHERE idNumber = ?', [req.body, idNumber]);
            res.json({ message: "Person updated" });
        });
    }
    ;
    //Delete register
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idNumber } = req.params;
            yield database_1.default.query('DELETE FROM people WHERE idNumber = ?', [idNumber]);
            res.json({ message: 'Person deleted.' });
        });
    }
    ;
    //Validate authorization
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idVerification = yield database_1.default.query('SELECT * from credentials WHERE user = ? AND pass = ?', [req.body.user, req.body.pass]);
            let finalStatus = { auth: true };
            //Verifying
            if (!idVerification.length) {
                finalStatus.auth = false;
            }
            return res.json(finalStatus);
        });
    }
    ;
    //Validate contest authorization
    authContest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idVerification = yield database_1.default.query('SELECT * from credentials WHERE contest = ?', [req.body.contest]);
            let finalStatus = { auth: true };
            //Verifying
            if (!idVerification.length) {
                finalStatus.auth = false;
            }
            return res.json(finalStatus);
        });
    }
    ;
}
const peopleController = new PeopleController();
exports.default = peopleController;
/*{
    "completeName": "PIRRYLOPELA",
    "idNumber": "12345" ,
    "email": "wey@pirry.lopela",
    "phoneNumber": "3506697825",
    "favBrand": "BAJ"
}*/ 
