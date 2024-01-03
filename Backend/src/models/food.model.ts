import { Schema, model } from "mongoose";

 export interface Food{
    id:string;
    name:string;
    ingredients:string[];
    doughIng:string[];
    sauceIng:string[];
    tags:string[];
    favorite:boolean;
    instructions:string[];
    imageUrl:string;
    origins:string[];
    cookTime:string;
    link:string;
 }

 export const FoodSchema = new Schema<Food>(
    {
        name: {type: String, required:true},
        ingredients: {type: [String], required:true},
        doughIng: {type: [String], required:true},
        sauceIng: {type: [String], required:true},
        tags: {type: [String]},
        favorite: {type: Boolean, default:false},
        instructions: {type: [String], required:true},
        imageUrl: {type: String, required:true},
        origins: {type: [String], required:true},
        cookTime: {type: String, required:true},
        link: {type: String}
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
           virtuals: true
        },
        timestamps: true
    }
)

export const FoodModel = model<Food>('food', FoodSchema);