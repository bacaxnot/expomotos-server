"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const peopleRoutes_1 = __importDefault(require("./routes/peopleRoutes"));
const standRoutes_1 = __importDefault(require("./routes/standRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    //This gets the port: either given by server (process.env) or local (3000)
    config() {
        //this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)("dev")); //Allows to see realtime petitions to server on DEV command
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); //Allows use of json files
        this.app.use(express_1.default.urlencoded({ extended: false })); //Allows send info through HTML form
    }
    routes() {
        this.app.use("/", indexRoutes_1.default);
        this.app.use("/api/people", peopleRoutes_1.default);
        this.app.use("/api/stand", standRoutes_1.default);
    }
    //This starts the server on given port
    start() {
        this.app.listen(3000);
    }
}
//Starting server
const server = new Server();
server.start();
