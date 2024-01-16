import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {
  userName?: string;
  isAdmin!: boolean;

  constructor(private _router:Router,private _userService: UserService){}

  ngOnInit() {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : null;
  
    if (userId !== null) {
      this._userService.fetchUserById(userId).subscribe((res: any) => {
        this.userName = res.lastName;
        this.isAdmin = res.role === "ADMIN";
        console.log(res);
      });
    } else {
      // Handle the case where userId is null
      console.error('User ID is null.');
    }
  }
  

  logout(){
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userId");
    this._router.navigate(['/login']);
  }
  goToProfile(){
    console.log("User profile");
  }

  goToMeasurements(){
    this._router.navigateByUrl("/measurements");
  }

  goToDevices(){
    this._router.navigateByUrl("/devices");
  }

  goToChat(){
    this._router.navigateByUrl("/chat");
  }
}
