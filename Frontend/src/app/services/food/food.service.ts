import { Injectable } from '@angular/core';
import { Tag } from 'src/app/shared/models/Tag';
import { Food } from 'src/app/shared/models/food';
import { sample_foods } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{
    return sample_foods;
  }

  getFoodById(id: number):Food{
    return this.getAll().find(food => food.id == id)!;
  }

  getAllFoodsByTag(tag: string):Food[]{
    if(tag == "All")
      return this.getAll();
    else
      return this.getAll().filter(food => food.tags?.includes(tag))  
  }

  getAllTags():Tag[]{
    return[
      { name: 'All', count: 14},
      { name: 'FastFood', count: 4},
      { name: 'Pizza', count: 2},
      { name: 'Lunch', count: 3},
      { name: 'SlowFood', count: 2},
      { name: 'Hamburger', count: 1},
      { name: 'Fry', count: 1},
      { name: 'Soup', count: 1}
    ]
  }

  getAllFoodsBySearchTerm(searchTerm:string):Food[]{
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
}
