import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';

import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))

app.use(bodyParser.json({limit: '1175mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '1175mb',
    parameterLimit: 50000000,
  }),
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);

const port = 5000;

//===================================Listener===============================================
app.listen(port, ()=>{
    console.log("Website served on http://localhost:" + port);
})