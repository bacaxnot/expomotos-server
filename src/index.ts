import express, {Application} from 'express';
import morgan from "morgan";
import cors from "cors";

import indexRoutes from "./routes/indexRoutes";
import peopleRoutes from "./routes/peopleRoutes";
import standRoutes from "./routes/standRoutes";

class Server{
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    //This gets the port: either given by server (process.env) or local (3000)
    config(): void {
        //this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan("dev")); //Allows to see realtime petitions to server on DEV command
        this.app.use(cors()); 
        this.app.use(express.json()); //Allows use of json files
        this.app.use(express.urlencoded({extended: false})); //Allows send info through HTML form
    }
    routes(): void {
        this.app.use("/" ,indexRoutes);
        this.app.use("/api/people", peopleRoutes);
        this.app.use("/api/stand", standRoutes);
    }
    //This starts the server on given port
    start(): void {
        this.app.listen(3000);
    }

}

//Starting server
const server = new Server();
server.start();