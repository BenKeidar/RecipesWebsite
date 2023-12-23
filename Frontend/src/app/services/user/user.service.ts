import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from 'src/app/shared/constants/urls';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';
import { User } from 'src/app/shared/models/User';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceTsService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable:Observable<User>;
  
  constructor(private http:HttpClient, private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Ben Apetite ${user.name}!`, `Login successful`
          );
        },
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error, 'Login failed');
        }
      })
    );
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();//else
  }
}
