import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food/food.service';
import { UserServiceTsService } from 'src/app/services/user/user.service';
import { IFoodUpload } from 'src/app/shared/interfaces/IFoodUpload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{
  uploadForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  base64Image = '';
  base64String = '';
  file: File | undefined ;


  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService:UserServiceTsService
    ){ } 

    ngOnInit(): void {
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
  
      this.returnUrl = this.userService.getPrevUrl();
    }

    onFileChange(event: any) {
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
        id:1,
        name: fv.name,
        ingredients: ing,
        doughIng: dough,
        sauceIng: sauce,
        stuffingIng: stuffing,
        tags: fv.tags.split(","),
        instructions: fv.instructions.split(","),
        imageUrl: this.base64String,
        origins: fv.origins.split(","),
        cookTime: fv.cookTime,
        link: fv.link,
      };

      this.foodService.upload(recipe).subscribe(_ => {
        this.router.navigateByUrl(this.returnUrl);
      })
    }
}