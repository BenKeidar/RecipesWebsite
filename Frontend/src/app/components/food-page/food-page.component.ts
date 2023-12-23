import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/food';


@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit{
  
  food!: Food;
  constructor(private foodService:FoodService, private activatedRoute:ActivatedRoute){
    activatedRoute.params.subscribe((params)=>{
      if(params['id'])
        foodService.getFoodById(params['id']).subscribe(serverFood =>{
          this.food = serverFood;
        });
        console.log(this.food)
    })
   }

  ngOnInit(): void {
  }
}
