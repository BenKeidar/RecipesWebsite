import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from 'src/app/shared/constants/urls';
import { Tag } from 'src/app/shared/models/Tag';
import { Food } from 'src/app/shared/models/food';
//import { sample_foods } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  //-----------------------------------Constructor--------------------------------------------
  constructor(private http:HttpClient) { }

  //-----------------------------------Get all recipes----------------------------------------
  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }

  //-----------------------------------Get recipe by id---------------------------------------
  getFoodById(id: number):Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL + id);
  }

  //-----------------------------------Get recipes by tag-------------------------------------
  getAllFoodsByTag(tag: string):Observable<Food[]>{
    if(tag == "הכל")
      return this.getAll();
    else
      return this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  //-----------------------------------Get all tags-------------------------------------------
  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  //-----------------------------------Get recipe by searchTerm-------------------------------
  getAllFoodsBySearchTerm(searchTerm:string):Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }
}
