import { Component, Inject } from '@angular/core';
import { filter } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserUpdateDialogComponent } from '../user-update-dialog/user-update-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];
  displayedColumns: string[] = ['FirstName', 'LastName', 'DateOfBirth', 'Email','actions'];

  constructor(
    private userService: UserService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe((data: User[]) => {
      // Filter out users with the role "admin" before storing in this.users
      this.users = data.filter(user => user.role !== 'ADMIN');
    });
  }
  
  deleteUser(userId:number):void{
    this.userService.deleteUser(userId).subscribe(() => this.document.location.reload());
  }
}
