import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsComponent } from './partials/tags/tags.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FoodPageComponent } from './components/food-page/food-page.component';
import { UploadComponent } from './upload/upload.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TitleComponent } from './partials/title/title.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { timeout } from 'rxjs';
import { InputContainerComponent } from './partials/input-container/input-container.component';
import { InputValidationComponent } from './partials/input-validation/input-validation.component';
import { TextInputComponent } from './partials/text-input/text-input.component';
import { DefaultButtonComponent } from './partials/default-button/default-button.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],  
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    UploadComponent,
    NotFoundComponent,
    LoginPageComponent,
    TitleComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
