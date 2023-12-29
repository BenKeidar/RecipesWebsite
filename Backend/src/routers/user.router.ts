import {Router} from 'express'
import {sample_users } from '../data';
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();

//===================================Post-APIs==============================================

//-----------------------------------Get recipe by id---------------------------------------
//-----------------------------------Seed
router.get("/seed", asyncHandler(
    async (req, res) =>{
        const usersCount = await UserModel.countDocuments();
        if(usersCount > 0){
            res.send("Seed already done");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed done");

    }
))

//-----------------------------------Login
router.post("/login", asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email});
    
       if(user && (await bcrypt.compare(password,user.password))) {
        res.send(generateTokenReponse(user));
       }
       else{
         res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
       }
    }
  ))

  //-----------------------------------Register
  router.post('/register', asyncHandler(
    async (req,res) =>{
      const {name, email, password, address} = req.body;
      
      //Check if user already exists
      const user = await UserModel.findOne({email});
      
      if(user){//if user exists
        res.status(HTTP_BAD_REQUEST).send('User already exists, please login');
        return;
      }

      //Encrypt password
      const encryptedPassword = await bcrypt.hash(password, 10);

      //Create new user
      const newUser:User = {
        id:'',
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false
      }

      //Save new user into DB
      const dbUser = await UserModel.create(newUser);
      res.send(generateTokenReponse(dbUser));
    }
  ))

//===================================Functions==============================================
const generateTokenReponse = (user : User) => {
    const token = jwt.sign({
      id: user.id, email:user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!,{
      expiresIn:"30d"
    });
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
  }

export default router;