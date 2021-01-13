import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

  constructor (public AuthService: AuthService) {}

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.AuthService.addUser(form.value.email, form.value.password);
  }
}
