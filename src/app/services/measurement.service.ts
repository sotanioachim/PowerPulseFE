import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Measurement } from '../models/measurement.model';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private _http: HttpClient) { }

  getAllMeasurements(): Observable<Measurement[]> {
    
    return this._http.get<Measurement[]>(environment.baseMeasurementURL);
  }

  getMeasurementsByDate(date: string): Observable<Measurement[]>{
    return this._http.get<Measurement[]>(`${environment.baseMeasurementURL}/date?date=`+ date);
  }
}
