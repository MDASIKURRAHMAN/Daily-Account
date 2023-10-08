import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  constructor(private http: HttpClient) { }
  getDashBoardElements(): Observable<any> {
    return this.http.get<any>('https://localhost:7188/api/Dashboard');
  }

}
