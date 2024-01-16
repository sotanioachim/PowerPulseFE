import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private _http:HttpClient) { }

  fetchDevices():Observable<Device[]>{
    return this._http.get<Device[]>(`${environment.baseDeviceURL}`).pipe(
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }

  fetchDeviceById(deviceId:number):Observable<Device>{
    return this._http.get<Device>(`${environment.baseDeviceURL}/`+deviceId).pipe(
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }

  fetchDevicesByUserId(userId:number):Observable<Device[]>{
    return this._http.get<Device[]>(`${environment.baseDeviceURL}/ForUser/`+userId).pipe(
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }

  createDevice(device:Device):Observable<Device>{
    return this._http.post<Device>(`${environment.baseDeviceURL}`,device).pipe(
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }

  updateDevice(device:Device):Observable<Device>{
    return this._http.put<Device>(`${environment.baseDeviceURL}`,device).pipe(
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }

  deleteDevice(deviceId:number):Observable<any>{
    return this._http.delete<Device>(`${environment.baseDeviceURL}/`+deviceId).pipe(
      catchError((err:string) =>{
        return throwError(()=>err)
      })
    );
  }
}
