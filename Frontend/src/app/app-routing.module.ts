import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodPageComponent } from './components/food-page/food-page.component';
import { UploadComponent } from './upload/upload.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'search/:searchTerm', component:HomeComponent},
  {path:'tag/:tag', component:HomeComponent},
  {path:'food/:id', component:FoodPageComponent},
  {path:'Upload', component:UploadComponent},
  {path:'Login', component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
