import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FoodPageComponent } from './components/food-page/food-page.component';
import { UploadComponent } from './components/upload/upload.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { EditComponent } from './components/edit/edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'search/:searchTerm', component:HomeComponent},
  {path:'tag/:tag', component:HomeComponent},
  {path:'food/:id', component:FoodPageComponent},
  {path:'delete/:id', component:DeleteDialogComponent},
  {path:'Upload', component:UploadComponent},
  {path:'Login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent},
  {path:'edit', component:EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, MatDialogModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }