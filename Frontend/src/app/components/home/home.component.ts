import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  foods:Food[] = [];
  
  constructor(private foodService:FoodService, private route:ActivatedRoute){
    let foodsObservable:Observable<Food[]>;
    this.route.params.subscribe(params => {
      // console.log("========================"+params['searchTerm'])
      if(params['searchTerm']){
        console.log("1")
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm'])
      }
      else if(params['tag'])
      {
        console.log("2")
        foodsObservable = this.foodService.getAllFoodsByTag(params['tag']);
      } 
      else{
        console.log("3")
        foodsObservable = this.foodService.getAll();
      }

      foodsObservable.subscribe((serverFoods) =>{
        this.foods = serverFoods;
      })
    })
  }

  ngOnInit(): void {
  }
}
