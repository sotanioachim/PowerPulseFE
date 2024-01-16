import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerURL!: string;

  constructor(private _http: HttpClient) { 
    this.registerURL = "/register";
  }

  registerUser(user:User):Observable<User>{
    return this._http.post<User>(`${environment.authURL}${this.registerURL}`,user).pipe(
      map((response:any) => {return response}),
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }

  registerUserToDevice(user:User):Observable<User>{
    const userDTO = {
      userId: user.userId,
      name: user.firstName
    }
    return this._http.post<any>(environment.baseUserURL,userDTO).pipe(
      map((response:any) => {return response}),
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    )
  }
}
