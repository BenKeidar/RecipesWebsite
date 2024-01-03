import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food/food.service';
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
    ){ } 

    ngOnInit(): void {
      this.uploadForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        ingredients: [[''], [Validators.required]],
        doughIng: [[''], ],
        sauceIng: [[''], ],
        tags: [[], [Validators.required]],
        instructions: [[], [Validators.required]],
        imageUrl: ['', [Validators.required]],
        origins: [[], [Validators.required]],
        cookTime: ['', [Validators.required]],
        link: ['', ]
      });
  
      this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
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
        this.base64String = reader.result as string;   
        this.base64Image = reader.result as string;    
      }
    }
    
    submit(){
      this.isSubmitted = true;
      if(this.uploadForm.invalid) return;
  
      const fv= this.uploadForm.value;

      var d = [''];
      if(fv.doughIng.includes(","))
        d = fv.doughIng.split(",");

      var s = [''];
      if(fv.sauceIng.includes(","))
        s = fv.sauceIng.split(",");

      const recipe :IFoodUpload = {
        id:1,
        name: fv.name,
        ingredients: fv.ingredients.split(","),
        doughIng: d,
        sauceIng: fv.s,
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
