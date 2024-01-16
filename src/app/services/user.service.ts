import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  fetchUsers():Observable<User[]>{
    return this._http.get<User[]>(`${environment.baseUserURL}`).pipe(
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }

  fetchUserById(userId:number):Observable<User>{
    return this._http.get<User>(`${environment.baseUserURL}/` + userId).pipe(
      map((result:User) => {
        return result;
      }),
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }

  updateUser(user:any):Observable<User>{
    return this._http.put(`${environment.baseUserURL}`,user).pipe(
      map((result:User) => {
        return result;
      }),
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }

  deleteUser(userId:number):Observable<any>{
    return this._http.delete(`${environment.baseUserURL}/` + userId).pipe(
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    )
  }

  deleteUserFromDevice(userId:number):Observable<any>{
    return this._http.delete("http://localhost:8000/user/" + userId).pipe(
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    )
  }
}
