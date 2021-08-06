import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { filter, map, take } from 'rxjs/operators';
import { User } from '../models/user';
import { UserManagerServiceService } from 'src/app/services/user-manager-service.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router,private userManager:UserManagerServiceService) {

   }
 
  canLoad(): Observable<boolean> {    
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map(isAuthenticated => {
        console.log('Found previous token ?, automatic login '+isAuthenticated);
        if (isAuthenticated) {
          //Load user 
          this.userManager.getUser().then((user:User)=>{
           if (user){
              this.router.navigateByUrl('/home', { replaceUrl: true });
            }
            else{
              console.log("=== No user")
              this.authService.isAuthenticated.next(false);
              this.router.navigateByUrl('/login', { replaceUrl: true });
              return true;
            }
          })
        } else {          
          return true;
        }
      })
    );
  }
}