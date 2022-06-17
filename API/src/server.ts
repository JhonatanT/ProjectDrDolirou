import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"
import cors from "cors"
import http from "http"
import { router } from "./routes"
import path from 'path'
import { Server } from "socket.io";

const app = express()
app.use(cors())
app.use(express.json())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(router)

app.use(express.static('../imgs/'));
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});


//Dev chat for system
app.use(express.static(path.join(__dirname, '..','public')))
app.set('views', path.join(__dirname, '..','public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.get('/chat_DEV', async (req, res) => {
    res.render('index.html')
})

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    //verificando se o erro é uma instancia da classe Error se for retorna um Status
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: "erro interno"
    });
})

const serverHttp = http.createServer(app)
const io  = new Server(serverHttp)

export {serverHttp, io}