import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/app/components/login/login.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn = this._loginService.loggedIn;

  constructor(private _loginService: LoginService) {
    this._loginService.isloggedInEmitter.subscribe(isLoggedIn => {
      console.log('status change', isLoggedIn);
      this.loggedIn = isLoggedIn;
    });
   }

  ngOnInit() {
    console.log('status', this.loggedIn);
  }

  public logout() {
    this._loginService.logout();
  }

}
