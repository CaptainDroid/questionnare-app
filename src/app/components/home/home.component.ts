import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user;
  public name;

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    this.user = this._loginService.getUser();
    this.name = this.user.name;
  }

}
