export class Food{
    id!:number;
    name!:string;
    ingredients?:string[];
    doughIng?:string[];
    sauceIng?:string[];
    stuffingIng?:string[];
    tags?:string[];
    favorite:boolean = false;
    instructions!:string[];
    imageUrl!:string;
    origins!:string[];
    cookTime!:string;
    link?:string;
}