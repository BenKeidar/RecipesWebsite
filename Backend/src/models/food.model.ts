import { Schema, model } from "mongoose";

 
 export interface Food{
    id:number;
    name:string;
    ingredients:string[];
    tags:string[];
    favorite:boolean;
    instructions:string[];
    imageUrl:string;
    origins:string[];
    cookTime:string;
 }

 export const FoodSchema = new Schema<Food>(
    {
        name: {type: String, required:true},
        ingredients: {type: [String], required:true},
        tags: {type: [String]},
        favorite: {type: Boolean, default:false},
        instructions: {type: [String], required:true},
        imageUrl: {type: String, required:true},
        origins: {type: [String], required:true},
        cookTime: {type: String, required:true},
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