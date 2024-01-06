import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsComponent } from './partials/tags/tags.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FoodPageComponent } from './components/food-page/food-page.component';
import { UploadComponent } from './components/upload/upload.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TitleComponent } from './partials/title/title.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { timeout } from 'rxjs';
import { InputContainerComponent } from './partials/input-container/input-container.component';
import { InputValidationComponent } from './partials/input-validation/input-validation.component';
import { TextInputComponent } from './partials/text-input/text-input.component';
import { DefaultButtonComponent } from './partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UploadImgComponent } from './partials/upload-img/upload-img.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import {MatDialogModule } from '@angular/material/dialog';
import { LoadingComponent } from './partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor.spec';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
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
    DefaultButtonComponent,
    RegisterPageComponent,
    UploadImgComponent,
    EditComponent,
    DeleteDialogComponent,
    LoadingComponent
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
