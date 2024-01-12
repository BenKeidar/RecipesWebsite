export interface IFoodUpload{
    id:number;
    name:string;
    ingredients:string[];
    doughIng:string[];
    sauceIng:string[];
    stuffingIng:string[];
    tags:string[];
    //favorite:boolean;
    instructions:string[];
    imageUrl:string;
    origins:string[];
    cookTime:string;
    link:string;
}