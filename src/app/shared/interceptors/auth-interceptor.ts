import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { API_URL } from "../utils/constants/util-constants";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = localStorage.getItem('token');
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (req.url.startsWith(API_URL)) {
      if (authToken) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          }
        });
        // send cloned request with header to the next handler.
        return next.handle(authReq).pipe(
          catchError(error => {
            if (error.status === 401) {
              // Handle unauthorized error and redirect to login page
              this.authService.logout();
            }
            return throwError(() => error);
          })
        );
      }
    }
    return next.handle(req);
  }
}
