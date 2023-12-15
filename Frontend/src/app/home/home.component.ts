import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  foods:Food[] = [];
  
  constructor(private foodService:FoodService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log("========================"+params['searchTerm'])
      if(params['searchTerm']){
        console.log("1")
        this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm'])
      }
      else if(params['tag'])
      {
        console.log("2")
        this.foods = this.foodService.getAllFoodsByTag(params['tag']);
      } 
      else{
        console.log("3")
        this.foods = this.foodService.getAll();
      }
    })

    //this.foods = this.foodService.getAll();
  }
}
