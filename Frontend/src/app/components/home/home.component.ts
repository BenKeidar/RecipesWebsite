import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food/food.service';
import { UserServiceTsService } from 'src/app/services/user/user.service';
import { IFoodPart } from 'src/app/shared/interfaces/IFoodPart';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  foods:Food[] = [];
  
  constructor(private foodService:FoodService, 
              private route:ActivatedRoute,
              private userService:UserServiceTsService,
              private router: Router){
    let foodsObservable:Observable<Food[]>;
    this.route.params.subscribe(params => {
      // console.log("========================"+params['searchTerm'])
      if(params['searchTerm']){
        //console.log("1")
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm'])
      }
      else if(params['tag'])
      {
        foodsObservable = this.foodService.getAllFoodsByTag(params['tag']);
      } 
      else{
        //console.log("3")
        foodsObservable = this.foodService.getAll();
      }

      this.userService.setCurrentUrl(this.router.url);

      foodsObservable.subscribe((serverFoods) =>{
        this.foods = serverFoods;
      })
    })
  }

  getImg(img: string){
    return atob(img)
  }

  ngOnInit(): void {
  }

  // setFav(id:number, favorite:boolean){
  //   //this.food.favorite = !this.food.favorite;

  //   const recipe :IFoodPart = {
  //     id: id,
  //     name: '',
  //     favorite: !favorite
  //   };

  //   this.foodService.changeFavorite(recipe).subscribe(_ => {
  //     //this.foods = recipe.favorite;
  //   })
  //}
}
