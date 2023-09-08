import { Component } from '@angular/core';
import {IUserCredentials} from "../user.model";
import {FormControl, Validators} from '@angular/forms';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'bot-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  credentials: IUserCredentials = { email: '', password: '' };
  signInError: boolean = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private userService: UserService, private router: Router) { }

  signIn() {
    this.validateEmail();

    this.signInError = false;
    this.credentials.email = this.email.value!;
    this.userService.signIn(this.credentials).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: () => (this.signInError = true)
    });
  }

  validateEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
