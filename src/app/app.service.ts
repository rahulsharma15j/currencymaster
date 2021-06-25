import { Injectable } from '@angular/core';

import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = 'http://3.108.60.86:8080/api';

  constructor(private http: HttpClient) {}

  public getList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/currency`);
  }

  public getItem(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/currency/${id}`);
  }

  public editItem(data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/currency/`, data);
  }

  public deleteItem(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/currency/${id}`);
  }
}
