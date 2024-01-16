import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css']
})
export class UserUpdateDialogComponent implements OnInit {
  updateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      firstName: [this.data.user.firstName, Validators.required],
      lastName: [this.data.user.lastName, Validators.required],
      dateOfBirth: [this.data.user.dateOfBirth, Validators.required],
      email:[this.data.user.email,Validators.required]
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const user:User = {
          userId: this.data.user.userId,
          firstName: this.updateForm.get('firstName')?.value,
          lastName: this.updateForm.get('lastName')?.value,
          dateOfBirth: this.updateForm.get('dateOfBirth')?.value,
          email: this.updateForm.get('email')?.value
      }
      this.userService.updateUser(user).subscribe((res) => {
        this.dialogRef.close(this.updateForm.value);
      });
      
    }
  }
}
