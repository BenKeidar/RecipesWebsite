import express, {Router} from 'express'
import { sample_foods, sample_tags } from '../data';
import asynceHandler from 'express-async-handler';
import { Food, FoodModel } from '../models/food.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';

const router = Router();

//===================================Get-APIs===============================================
//-----------------------------------Seed---------------------------------------------------
router.get("/seed", asynceHandler(
    async (req, res) =>{
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount > 0){
            res.send("Seed already done");
            return;
        }
        await FoodModel.create(sample_foods);
        res.send("Seed done");

    }
))

//-----------------------------------Get all recipes----------------------------------------
router.get("/", asynceHandler(
    async (req, res) => {
        const foods = await FoodModel.find();
        res.send(foods);
    }
)) 

//-----------------------------------Get recipe by searchTerm-------------------------------
router.get("/search/:searchTerm", asynceHandler(
    async  (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await FoodModel.find({name: {$regex: searchRegex}});
        res.send(foods);
    })
) 

//-----------------------------------Get all tags-------------------------------------------
router.get("/tags", asynceHandler(
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            {
               $unwind: '$tags'
            },
            {
                $group:{
                    _id: '$tags',
                    count: {$sum: 1}
                }
            },
            {
                $project:{
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1})

        const all = {
            name: 'הכל',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all);
        tags.reverse();
        //console.log(tags);
        res.send(tags);
    })
)

//-----------------------------------Get recipes by tag-------------------------------------
router.get("/tag/:tagName", asynceHandler(
    async (req, res) => {
        const foods = await FoodModel.find({tags: req.params.tagName}); 
        res.send(foods);
    })
)

//-----------------------------------Get recipe by id---------------------------------------
router.get("/:foodId", asynceHandler(
    async (req, res) => {
        const food = await FoodModel.findById(req.params.foodId);
        res.send(food);
    })
)

//===================================Post-APIs==============================================
  //---------------------------------Upload-------------------------------------------------
  router.post('/Upload', asynceHandler(
    async (req,res) =>{
      const {id, name, ingredients, doughIng, sauceIng, tags, instructions, imageUrl, origins, cookTime, link} = req.body;
      
      //Check if recipe already exists
      const user = await FoodModel.findOne({name});
      
      if(user){//if recipe exists
        res.status(HTTP_BAD_REQUEST).send('User already exists, please login');
        return;
      }

      //Create new recipe
      const newFood:Food = {
        id:'',
        name,
        ingredients,
        doughIng,
        sauceIng,
        tags,
        favorite: false,
        instructions,
        imageUrl,
        origins,
        cookTime,
        link
      }

      //Save new recipe into DB
      const dbFood = await FoodModel.create(newFood);
      res.send(dbFood);
    }
  ))

//---------------------------------Upload-------------------------------------------------
router.post('/Edit', asynceHandler(
    async (req,res) =>{
        const {id, name, ingredients, doughIng, sauceIng, tags, instructions, imageUrl, origins, cookTime, link} = req.body;

        console.log("888888888888888");

        //Create new recipe
        const newFood:Food = {
        id:'',
        name,
        ingredients,
        doughIng,
        sauceIng,
        tags,
        favorite: false,
        instructions,
        imageUrl,
        origins,
        cookTime,
        link
        }

        //Update recipe into DB
        const dbFood = await FoodModel.findByIdAndUpdate(id,
        {$set:{
            name: newFood.name,
            ingredients: newFood.ingredients,
        }});

        res.send(dbFood);
    }
))

export default router;