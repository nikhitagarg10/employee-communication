import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('access_token'); 
    const excludedUrls = ['/auth/login', '/auth/createuser']; 

    if (excludedUrls.some(url => req.url.includes(url))) {
      return next.handle(req);
    }

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }

    return next.handle(req); // If no token, send request without modification
  }
}
