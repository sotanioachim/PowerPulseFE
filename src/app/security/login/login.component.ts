import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Replace this with your authentication logic, e.g., API calls to authenticate the user.
      this._loginService.loginUser(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value)
        .subscribe((response: any) => {
          localStorage.setItem('auth_token', response.jwt);
          localStorage.setItem('userId', response.user.userId);
          if(response.user.role === "USER")
            this._router.navigate(['/devices']);
          else
            this._router.navigate(['/users']);
      });
      
    }
  }

}
