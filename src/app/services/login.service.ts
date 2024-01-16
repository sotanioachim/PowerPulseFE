import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serviceUrl!: string;

  constructor(private _http: HttpClient) { 
    this.serviceUrl = "/login";
  }

  loginUser(username: string, password: string): any{
    return this._http.post<string>(`${environment.authURL}${this.serviceUrl}`,{username: username, password: password}).pipe(
      map((response:any)=>{
        return response;
      }),
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }
}
