import { AuthenticationService } from './../services/authentication.service';
import { Injectable, NgZone } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AutoGuard implements CanLoad {
  constructor(private authService: AuthenticationService,private router: Router) { }
 
  canLoad(): Observable<boolean> {    
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map(isAuthenticated => {
        if (isAuthenticated) {  
          return true;
        } else {          
          this.router.navigateByUrl('/login', { replaceUrl: true })
          return false;
        }
      })
    );
  }
}