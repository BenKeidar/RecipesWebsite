import { Component } from '@angular/core';
import { UserServiceTsService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user!:User;

  constructor(private userService:UserServiceTsService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void{}

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
