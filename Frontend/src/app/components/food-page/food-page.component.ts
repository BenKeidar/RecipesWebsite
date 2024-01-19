import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food/food.service';
import { UserServiceTsService } from 'src/app/services/user/user.service';
import { IFoodPart } from 'src/app/shared/interfaces/IFoodPart';
import { IFoodUpload } from 'src/app/shared/interfaces/IFoodUpload';
import { User } from 'src/app/shared/models/User';
import { Food } from 'src/app/shared/models/food';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit{
  
  food!:Food;
  user!:User;
  
  constructor(
    private foodService:FoodService, 
    private activatedRoute:ActivatedRoute,
    private userService:UserServiceTsService,
    private router: Router,
    public dialog:MatDialog){
    activatedRoute.params.subscribe((params)=>{
      if(params['id'])
        foodService.getFoodById(params['id']).subscribe(serverFood =>{
          this.food = serverFood;
        });
        //console.log(this.food)
    })
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
   })
   this.userService.setCurrentUrl(this.router.url);
   this.user = this.userService.currentUser;

   this.food = this.foodService.currentFood;
  }

  ngOnInit(): void {
  }

  checkIfEven(s:string, arr:string[] | undefined): boolean{
    if(arr == undefined)
      return false;
    if(arr.indexOf(s) != null){
      if(arr.indexOf(s) %2 != 0){
        return false;
      }
      return true;
    }
    return false;
  }

  checkIfEvenS(s:string): boolean{
    if(this.food.sauceIng?.indexOf(s) != null){
      if(this.food.sauceIng?.indexOf(s) %2 != 0){
        return false;
      }
      return true;
    }
    return false;
  }

  checkIfEvenSt(s:string): boolean{
    if(this.food.stuffingIng?.indexOf(s) != null){
      if(this.food.stuffingIng?.indexOf(s) %2 != 0){
        return false;
      }
      return true;
    }
    return false;
  }

  get isAuth(){
    return this.user.token;
  }

  setFav(){
    //this.food.favorite = !this.food.favorite;

    const recipe :IFoodPart = {
      id: this.food.id,
      name: this.food.name,
      favorite: !this.food.favorite
    };



    this.foodService.changeFavorite(recipe).subscribe(_ => {
      this.food.favorite = recipe.favorite;
    })
  }    

  getImg(){
    return atob(this.food.imageUrl)
  }
}
