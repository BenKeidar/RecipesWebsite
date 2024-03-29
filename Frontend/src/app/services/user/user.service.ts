import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from 'src/app/shared/constants/urls';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { User } from 'src/app/shared/models/User';

const USER_KEY = 'User';


@Injectable({
  providedIn: 'root'
})
export class UserServiceTsService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  PREV_URL = '';
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `ברוך הבא ${user.name}!`,
            'התחברת בהצלחה'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'ההתחברות נכשלה');
        }
      })
    );
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  register(userRegiser:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `ברוך הבא ${user.name}`,
            'נרשמת בהצלחה'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'ההרשמה נכשלה')
        }
      })
    )
  }


  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  public setCurrentUrl(url:string){
    this.PREV_URL = url;
  }

  public getPrevUrl():string{
    return this.PREV_URL;
  }
}
