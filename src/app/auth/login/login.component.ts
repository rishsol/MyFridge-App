import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (public AuthService: AuthService) {}

  onLogin(form: NgForm) {
    console.log('hi');
  }
}
