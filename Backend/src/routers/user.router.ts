import {Router} from 'express'
import { sample_foods, sample_tags, sample_users } from '../data';
import jwt from "jsonwebtoken";

const router = Router();

//===================================Post-APIs==============================================

//-----------------------------------Get recipe by id---------------------------------------
router.post("/Login", (req, res) => {
    const body = req.body;
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email === email &&
         user.password === password)

    if(user){
        res.send(generateTokenResponse(user))
    }else{
        res.status(400).send("Username or password is invalid!");
    }
})

//===================================Functions==============================================
const generateTokenResponse = (user:any) =>{
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, "SomeRandomText", {expiresIn: "30d"});

    user.token = token;
    return user;
}

export default router;