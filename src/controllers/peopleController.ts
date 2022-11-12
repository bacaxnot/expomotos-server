import { Request, response, Response } from "express";

import pool from "../database";

class PeopleController{
    //Get all registers
    public async list (req: Request, res: Response) {
        const people = await pool.query('SELECT * FROM people;');
        res.json(people);
    };
    //Get all register times
    public async getRegTimes (req: Request, res: Response) {
        const people = await pool.query('SELECT regDate FROM people;');
        res.json(people);
    };
    //Get all contestants
    public async getContestants (req: Request, res: Response) {
        const people = await pool.query('SELECT * FROM people WHERE standCount = 10;');
        res.json(people);
    };
    //Get all registers count
    public async getResume (req: Request, res: Response) {
        const resume = await pool.query('SELECT '+
                                        '(SELECT COUNT(*) from people) AS totalReg, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 0) AS standCount0, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 1) AS standCount1, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 2) AS standCount2, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 3) AS standCount3, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 4) AS standCount4, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 5) AS standCount5, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 6) AS standCount6, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 7) AS standCount7, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 8) AS standCount8, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 9) AS standCount9, '+
                                        '(SELECT COUNT(*) from people WHERE standCount = 10) AS standCount10, '+
                                        '(SELECT COUNT(*) from auteco) AS autecoReg, '+
                                        '(SELECT COUNT(*) from people WHERE favBrand = "auteco") AS autecoLovers, '+
                                        '(SELECT COUNT(*) from akt) AS aktReg, '+
                                        '(SELECT COUNT(*) from people WHERE favBrand = "akt") AS aktLovers, '+
                                        '(SELECT COUNT(*) from bajaj) AS bajajReg, '+
                                        '(SELECT COUNT(*) from people WHERE favBrand = "bajaj") AS bajajLovers, '+
                                        '(SELECT COUNT(*) from enfield) AS enfieldReg, '+
                                        '(SELECT COUNT(*) from people WHERE favBrand = "royal enfield") AS enfieldLovers, '+
                                        '(SELECT COUNT(*) from hero) AS heroReg, '+
                                        '(SELECT COUNT(*) from people WHERE favBrand = "hero") AS heroLovers, '+
                                        '(SELECT COUNT(*) from honda) AS hondaReg, '+
                                        '(SELECT COUNT(*) from people WHERE favBrand = "honda") AS hondaLovers, '+
                                        '(SELECT COUNT(*) from niu) AS niuReg, '+
                                        '(SELECT COUNT(*) from people WHERE favBrand = "niu") AS niuLovers, '+
                                        '(SELECT COUNT(*) from suzuki) AS suzukiReg, '+
                                        '(SELECT COUNT(*) from people WHERE favBrand = "suzuki") AS suzukiLovers, '+
                                        '(SELECT COUNT(*) from yamaha) AS yamahaReg, '+
                                        '(SELECT COUNT(*) from people WHERE favBrand = "yamaha") AS yamahaLovers, '+
                                        '(SELECT COUNT(*) from transito) AS transitoReg;'
                                        );
        
        
        res.json(resume[0]);        
    };
    //Get resume
    public async getCount (req: Request, res: Response) {
        const people = await pool.query('SELECT COUNT(entryNumber) AS regCount FROM people');
        res.json(people[0]);
        
    };
    //Get one register by idNumber
    public async getById (req: Request, res: Response): Promise<any>{
        const {idNumber} = req.params;
        const people = await pool.query('SELECT * FROM people WHERE idNumber = ?', [idNumber]);
        
        if (people.length) {
            return res.json(people[0]);
        }
        else{
            res.status(404)
            return res.json({message: "No existe un registro asociado a ese número de identificación."});
        }       
    };
    //Get one register by email
    public async getByEmail (req: Request, res: Response): Promise<any>{
        const {email} = req.params;
        const people = await pool.query('SELECT * FROM people WHERE email = ?', [email]);
        
        if (people.length) {
            return res.json(people[0]);
        }
        else{
            res.status(404)
            return res.json({message: "No existe un registro asociado a ese email."});
        }        
    };
    //Create new register
    public async create (req: Request, res: Response): Promise<any>{

        const newRegIdVerification = await pool.query('SELECT * from people WHERE idNumber = ?', [req.body.idNumber]);
        let finalStatus = {message: "Registro exitoso", idNumber: false};

        //Verifying idNumber and email
        if(newRegIdVerification.length){
            res.status(404);
            finalStatus.message = "No fue posible realizar el registro";
            finalStatus.idNumber = true;
        }
        else{
            await pool.query('INSERT INTO people SET ?', [req.body]);
        }
        return res.json(finalStatus);
    };
    //Update register
    public async update (req: Request, res: Response): Promise<void>{
        const {idNumber} = req.params;
        await pool.query('UPDATE people SET ? WHERE idNumber = ?', [req.body, idNumber]);
        res.json({message: "Person updated"})
    };
    //Delete register
    public async delete (req: Request, res: Response): Promise<void>{
        const {idNumber} = req.params;
        await pool.query('DELETE FROM people WHERE idNumber = ?', [idNumber]);
        res.json({message: 'Person deleted.'});
    };
    //Validate authorization
    public async auth (req: Request, res: Response): Promise<any>{

        const idVerification = await pool.query('SELECT * from credentials WHERE user = ? AND pass = ?', [req.body.user, req.body.pass]);
        let finalStatus = {auth: true};

        //Verifying
        if(!idVerification.length){
            finalStatus.auth = false;
        }
        return res.json(finalStatus);
    };
    //Validate contest authorization
    public async authContest (req: Request, res: Response): Promise<any>{

        const idVerification = await pool.query('SELECT * from credentials WHERE contest = ?', [req.body.contest]);
        let finalStatus = {auth: true};

        //Verifying
        if(!idVerification.length){
            finalStatus.auth = false;
        }
        return res.json(finalStatus);
    };
}

const peopleController = new PeopleController();
export default peopleController;
/*{
    "completeName": "PIRRYLOPELA",
    "idNumber": "12345" ,
    "email": "wey@pirry.lopela",
    "phoneNumber": "3506697825",
    "favBrand": "BAJ"
}*/