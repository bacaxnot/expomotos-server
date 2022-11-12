import { Request, Response } from "express";

import pool from "../database";

class StandController{
    //Get stand registers
    public async getStand (req: Request, res: Response) {
        const {stand} = req.params;
        
        const standRegs = await pool.query('SELECT * FROM ' + [stand]);
        
        return res.json(standRegs);
    };
    //Get stand register times
    public async getStandRegTimes (req: Request, res: Response) {
        const {stand} = req.params;
        
        const standRegs = await pool.query('SELECT standRegDate FROM ' + [stand]);
        
        return res.json(standRegs);
    };
    //Get stand register count
    public async getStandCount (req: Request, res: Response) {
        const {stand} = req.params;
        
        const standRegs = await pool.query('SELECT COUNT(idNumber) AS regCount FROM ' + [stand]);
        
        return res.json(standRegs[0]);
    };
    //Get user info by stand and idNumber
    public async getUserByStand (req: Request, res: Response): Promise<any>{
        const {stand} = req.params;
        const {idNumber} = req.params;
        
        const person = await pool.query('SELECT * FROM ' + [stand] + ' WHERE idNumber = ' + "?", [idNumber]);
        
        if (person.length) {
            return res.json(person[0]);
        }
        else{
            return res.status(404).json({message:"No existe un registro asociado a ese número de identificación"}); 
        }

    };
    //Create new register in stand
    public async create (req: Request, res: Response){
        const {stand} = req.params;

        const newRegStandVerification = await pool.query('SELECT * FROM ' + [stand] + ' WHERE idNumber = ' + "?", [req.body.idNumber]);
        const newRegIdVerification = await pool.query('SELECT * from people WHERE idNumber = ?', [req.body.idNumber]);
        const standCount = await pool.query('SELECT standCount FROM people WHERE idNumber = ?', [req.body.idNumber]);

        let finalStatus = {message: "Registro exitoso", global: true, stand: false, regStandCount: NaN};
        
        if(!(newRegIdVerification.length)){
            res.status(404);
            finalStatus.message = "No fue posible realizar el registro";
            finalStatus.global = false;
        }
        if(newRegStandVerification.length){
            res.status(404);
            finalStatus.message = "No fue posible realizar el registro";
            finalStatus.stand = true;
        }
        if(finalStatus.global && !finalStatus.stand){
            let standCountUpdate = standCount[0].standCount + 1;
            await pool.query('INSERT INTO ' + [stand] + ' SET ?', [req.body]);
            await pool.query('UPDATE people SET standCount = ? WHERE idNumber = ?', [standCountUpdate, req.body.idNumber]);
            finalStatus.regStandCount = standCountUpdate;
        }
        return res.json(finalStatus);
    };   
    //Delete user by stand and idNumber
    public async delete (req: Request, res: Response): Promise<void>{
        const {stand} = req.params;
        const {idNumber} = req.params;

        await pool.query('DELETE FROM ' + [stand] + ' WHERE idNumber = ' + "?", [idNumber]);
        res.json({message: 'Person deleted.'});
    };
}

const standController = new StandController();
export default standController;