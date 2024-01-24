import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { FoodService } from 'src/app/services/food/food.service';
import { UserServiceTsService } from 'src/app/services/user/user.service';
import { IFoodUpload } from 'src/app/shared/interfaces/IFoodUpload';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent  implements OnInit{
  food!: Food;
  uploadForm!:FormGroup;
  isSubmitted = false;
  isImgChanged = false;
  returnUrl = '';
  base64Image = '';
  base64String = '';
  file: File | undefined ;


  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService,
    private userService: UserServiceTsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ){
      activatedRoute.params.subscribe((params)=>{
        if(params['id'])
          foodService.getFoodById(params['id']).subscribe(serverFood =>{
            this.food = serverFood;
          });

          this.food = this.foodService.currentFood;
          //console.log(this.food.name)
      })

      this.uploadForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        ingredients: [[''], ],
        doughIng: [[''], ],
        sauceIng: [[''], ],
        stuffingIng: [[''], ],
        tags: [[], [Validators.required]],
        instructions: [[], [Validators.required]],
        imageUrl: ['', [Validators.required]],
        origins: [[], [Validators.required]],
        cookTime: ['', [Validators.required]],
        link: ['', ]
      });

      //console.log(this.food.ingredients);

      this.base64String = this.food.imageUrl;

      this.uploadForm.setValue({
        name: this.food.name,
        ingredients: this.food.ingredients?.toString(),
        doughIng: this.food.doughIng?.toString(),
        sauceIng: this.food.sauceIng?.toString(),
        stuffingIng: this.food.stuffingIng?.toString(),
        tags: this.food.tags?.toString(),
        instructions: this.food.instructions.toString(),
        imageUrl: this.base64String,
        origins: this.food.origins.toString(),
        cookTime: this.food.cookTime,
        link: this.food.link
      });

      this.returnUrl = this.userService.getPrevUrl();
    } 

  ngOnInit(): void {
    //this.returnUrl= this.router.url;
    //console.log(this.router.getCurrentNavigation()?.previousNavigation?.extractedUrl);
    //this.returnUrl= this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  onFileChange(event: any) {
    this.isImgChanged = true;
    this.file = event.target.files[0];
    this.convertToBase64();
  }

  get fc() {
    return this.uploadForm.controls;
  }

  convertToBase64() {

    if (!this.file) {
      return;
    }
    const reader = new FileReader();  
    reader.readAsDataURL(this.file);  
    reader.onload = () => {   
      this.base64String = btoa(reader.result as string);   
      this.base64Image = btoa(reader.result as string);    
    }
  }
  
  submit(){
    this.isSubmitted = true;
    if(this.uploadForm.invalid) return;

    const fv= this.uploadForm.value;

    var img = this.food.imageUrl;
    if(this.isImgChanged)
      img = this.base64String;

    var ing = undefined;
    if(fv.ingredients.includes(","))
      ing = fv.ingredients.split(",");
    else if(fv.ingredients != "")
      ing = fv.ingredients;

    var dough = undefined;
    if(fv.doughIng.includes(","))
      dough = fv.doughIng.split(",");
    else if(fv.doughIng != "")
      dough = fv.doughIng;

    var sauce = undefined;
    if(fv.sauceIng.includes(","))
      sauce = fv.sauceIng.split(",");
    else if(fv.sauceIng != "")
      sauce = fv.sauceIng;

    var stuffing = undefined;
    if(fv.stuffingIng.includes(","))
      stuffing = fv.stuffingIng.split(",");
    else if(fv.stuffingIng != "")
      stuffing = fv.stuffingIng;

    const recipe :IFoodUpload = {
      id: this.food.id,
      name: fv.name,
      ingredients: ing,
      doughIng: dough,
      sauceIng: sauce,
      stuffingIng: stuffing,
      tags: fv.tags.split(","),
      instructions: fv.instructions.split(","),
      imageUrl: img,
      origins: fv.origins.split(","),
      cookTime: fv.cookTime,
      link: fv.link,
    };

    this.foodService.update(recipe).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}
