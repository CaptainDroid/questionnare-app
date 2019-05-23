import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from './User';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public error;
  public submitted = false;

  constructor(private _loginService: LoginService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  login() {

    if (this.username === '') {
      return;
    }

    this.submitted = true;
    const user: User = {
      username: this.username,
      password: this.password
    };

    const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '';

    this._loginService.authenticate(user).subscribe((data: any) => {
      if (!data.success) {
        this.error = data.message;
        return;
      }
      this._loginService.setLogInStatus('login', data.user);
      this._router.navigate([returnUrl]);
    });

  }

}

