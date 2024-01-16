import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleService implements CanActivate{

  userId!: number;

  constructor(private _userService:UserService,private _router:Router, private _route:ActivatedRoute){}

  canActivate(): Observable<boolean> {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    if(userIdFromLocalStorage !== null)
      this.userId = parseInt(userIdFromLocalStorage);
    else
      this.userId = -1;
    return this._userService.fetchUserById(this.userId).pipe(
      map((res:User) => {
        if(res.role?.toUpperCase() === "ADMIN")
          return true;
        else{
          console.log(this._router.url)
          this._router.navigate([this._router.url]);
          return false;
        }
        
    }));
  }
}
