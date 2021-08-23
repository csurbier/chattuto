import { UserManagerServiceService } from './user-manager-service.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean;
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthenticationService,
                private userManager:UserManagerServiceService,
              private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.token;
    //console.log("=== Intercept token ")
    // console.log(accessToken)
    return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
      catchError(err => {
        // in case of 401 http error
        console.log("====MODIF ERROR url:"+req.url)
        console.log("====STATUS:"+err.status)
        if (req.url.indexOf("/devices")>0){
          return throwError(err);
        }
        if (req.url.indexOf("/refresh")>0){
          //REFRESHTOKEN KO 
          console.log("==== 401 LOGOUT CAR ERROR")
          // otherwise logout and redirect to login page
          return this.logoutAndRedirect(err);
        }
        if (err instanceof HttpErrorResponse && err.status === 401) {
          // get refresh tokens
         
          console.log("===401 ask for a new TOKEN using the refresh token ============")
          const refreshToken = this.authService.refresh;

          // if there are tokens then send refresh token request
          if (refreshToken && accessToken) {
            return this.refreshToken(req, next);
          }
          console.log("No refresh or access token. Logout user ",req.url)
          // otherwise logout and redirect to login page
          return this.logoutAndRedirect(err);
        }

        // in case of 403 http error (refresh token failed)
        if (err instanceof HttpErrorResponse && err.status === 403) {
          // logout and redirect to login page
          console.log("Error 403 LOGOuT ",req.url)
          return this.logoutAndRedirect(err);
        }
        // if error has status neither 401 nor 403 then just return this error
        return throwError(err);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
        let bearer = `Bearer ${token}`;
      ///  console.log("=== Clone request et add header avec token ",bearer)
        
      return request.clone({setHeaders: {Authorization: bearer}});
    }
    return request;
  }

  private logoutAndRedirect(err): Observable<HttpEvent<any>> {
    console.log("==== LOGOUT")
    this.userManager.logoutUser().then(()=>{
       
    })
    this.router.navigateByUrl('/login');
    return throwError(err);
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshingInProgress) {
      this.refreshingInProgress = true;
      this.accessTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((res) => {
          this.refreshingInProgress = false;
          this.authService.token = res["access"]
          this.authService.refresh = res["refresh"]
          console.log("==== REFRESH SET VALUES")
          this.accessTokenSubject.next(res["access"]);
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, res["access"]));
        }), catchError((err, caught) => {
            return this.logoutAndRedirect(err);
          })
      );
    } else {
      // wait while getting new token
      return this.accessTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, token));
        }));
    }
  }
}