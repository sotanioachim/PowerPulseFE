import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _router:Router
  ) {}

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      username: new FormControl(null, Validators.required),
      firstname: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {

      const user:User = {
        username: this.registerForm.get('username')?.value,
        firstName: this.registerForm.get('firstname')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        dateOfBirth: this.registerForm.get('dateOfBirth')?.value,
        password: this.registerForm.get('password')?.value
      };
      // Add your registration logic here, including password confirmation checks.
      this._registerService.registerUser(user).subscribe((response:User) => 
        this._registerService.registerUserToDevice(response).subscribe()
      );
    }
    this._router.navigate(['/login']);
  }
}
