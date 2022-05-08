import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class AuthService {
  private httpRoute: string = 'api/user/'
  constructor(private http: HttpClient) { }

  login (email: string, password: string): Observable<any> {
    return this.http.post(`${this.httpRoute}login`, {
      email, password
    }).pipe(map((data: any) => {
      if (typeof data === 'object') {
        if (data.token) {
          return `Bearer ${data.token}`;
        }
        return data.message;
      }
    }))
    
  }

  register (name: string, email: string, password: string, repeat_password: string): Observable<any> {
    return this.http.post(`${this.httpRoute}registration`, {
      name, email, password, repeat_password
    }).pipe(map((data: any) => {
      if (typeof data === 'object') {
        if (data.token) {
          return `Bearer ${data.token}`;
        }
        return data.message;
      }
    }))
  }

  getTokenFromLocalStorage(): any {
    return localStorage.getItem('auth_token');
  }

  isAuth (): Observable<any> {
    return this.http.get(`${this.httpRoute}isAuth`).pipe(map(data => {
      return data;
    }))
  }

}
