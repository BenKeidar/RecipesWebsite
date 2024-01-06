import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food/food.service';
import { UserServiceTsService } from 'src/app/services/user/user.service';
import { IFoodPart } from 'src/app/shared/interfaces/IFoodPart';
import { Food } from 'src/app/shared/models/food';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent  implements OnInit{
  @Input()
  color = 'gray'

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
      })

      this.uploadForm = this.formBuilder.group({
        name: ['', [Validators.required]],
      });

      this.returnUrl = this.userService.getPrevUrl();
  }

  get fc() {
    return this.uploadForm.controls;
  }

  onFileChange(event: any) {
    const fv= this.uploadForm.value;
    if(fv.name == this.food.name)
      this.color = 'red';
    else
      this.color = 'gray';
  }

  submit(){
    const fv= this.uploadForm.value;

    this.isSubmitted = true;
    if(this.uploadForm.invalid) return;

    if(fv.name != this.food.name)
      return;
    else{
      const recipe :IFoodPart = {
        id: this.food.id,
        name: this.food.name,
        favorite: false
      };

      this.foodService.deleteRecipe(recipe).subscribe(_ => {
        this.router.navigateByUrl('/');
      })
    }
  }

  ngOnInit(): void {
  }
}
