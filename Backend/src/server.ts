import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import path from 'path';
import { dbConnect } from './configs/database.config';

dbConnect();

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))

app.use(bodyParser.json({limit: '1175mb'}));

//app.use(express.bodyParser({limit: '50mb'}));
//);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);

const port = 5000;

app.get('/', function(req, res) {
    console.log("start");
    res.sendFile('Frontend/src/index.html', {root: __dirname });
});

//===================================Listener===============================================
app.listen(port, ()=>{
    console.log("Website served on http://localhost:" + port);
})