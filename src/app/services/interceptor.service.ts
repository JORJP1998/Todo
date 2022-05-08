import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()

export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getTokenFromLocalStorage()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getTokenFromLocalStorage()
        }
      })
    }
    return next.handle(req);
  }
}
