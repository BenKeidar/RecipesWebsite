import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food/food.service';
import { UserServiceTsService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/models/User';
import { Food } from 'src/app/shared/models/food';

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
    private userService:UserServiceTsService){
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

   this.user = this.userService.currentUser;

   this.food = this.foodService.currentFood;
  }

  ngOnInit(): void {
  }

  checkIfEven(s:string): boolean{
    if(this.food.doughIng?.indexOf(s) != null){
      if(this.food.doughIng?.indexOf(s) %2 != 0){
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

  get isAuth(){
    return this.user.token;
  }
}
