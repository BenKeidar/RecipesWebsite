import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, UPDATE_FOODS_URL, UPLOAD_FOODS_URL } from 'src/app/shared/constants/urls';
import { IFoodUpload } from 'src/app/shared/interfaces/IFoodUpload';
import { Tag } from 'src/app/shared/models/Tag';
import { Food } from 'src/app/shared/models/food';
//import { sample_foods } from 'src/data';

const FOOD_KEY = 'Food';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodSubject = new BehaviorSubject<Food>(this.getUserFromLocalStorage());
  private saved = false;
  //private foodSubject:Food | undefined;
  
  public get currentFood():Food{
    return this.foodSubject.value;
  }

  //-----------------------------------Constructor--------------------------------------------
  constructor(private http:HttpClient, private toastrService:ToastrService) { }

  //-----------------------------------Get all recipes----------------------------------------
  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }

  //-----------------------------------Get recipe by id---------------------------------------
  getFoodById(id: number):Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL + id).pipe(
      tap({
        next: (food) => {
          this.setFoodToLocalStorage(food);
          this.foodSubject.next(food);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Failed to display')
        }
      })
    )
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

  //-----------------------------------Post a new repipe--------------------------------------
  upload(foodUpload:IFoodUpload): Observable<Food>{
    return this.http.post<Food>(UPLOAD_FOODS_URL, foodUpload).pipe(
      tap({
        next: (food) => {
          this.toastrService.success(
            `${food.name} Uploaded successfully`
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Upload Failed')
        }
      })
    )
  }

    //-----------------------------------Update a repipe--------------------------------------
    update(foodUpload:IFoodUpload): Observable<Food>{
      return this.http.post<Food>(UPDATE_FOODS_URL, foodUpload).pipe(
        tap({
          next: (food) => {
            this.toastrService.success(
              `${food.name} Updated successfully`
            )
          },
          error: (errorResponse) => {
            this.toastrService.error(errorResponse.error,
              'Update Failed')
          }
        })
      )
    }
  
  //-----------------------------------Functions-----------------------------------------------
  public setFoodToLocalStorage(food:Food){
    localStorage.setItem(FOOD_KEY, JSON.stringify(food));
    this.saved = true;
    //this.foodSubject = food;
  }

  public getUserFromLocalStorage():Food{
    const userJson = localStorage.getItem(FOOD_KEY);
    if(userJson && this.saved) return JSON.parse(userJson) as Food;
    return new Food();
    // if(this.foodSubject)
    //   return this.foodSubject;
    // return new Food();
  }
}
