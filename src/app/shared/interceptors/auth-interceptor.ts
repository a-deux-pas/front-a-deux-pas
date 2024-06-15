import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { API_URL } from "../utils/constants/utils-constants";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = this.authService.getAuthorizationToken();
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    // TO DO : 1ère condition à supprimer une fois cloudinary implementé côté back
    if (req.url.startsWith(API_URL)) {
      if (authToken) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          }
        });
        // send cloned request with header to the next handler.
        return next.handle(authReq);
      }
    }
    return next.handle(req);
  }
}
