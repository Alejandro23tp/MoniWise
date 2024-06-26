import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../servicios/firebase.service';
import { UtilsService } from '../servicios/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {


  firebaseSvc = inject(FirebaseService);
  utilisSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = localStorage.getItem('user');
  
    
    return new Promise ((resolve)=>{
      this.firebaseSvc.getAuth().onAuthStateChanged((auth)=>{
        if(auth){
         if (user) resolve(true)
        }
        else{
          this.utilisSvc.routerLink('/login');
          resolve(false)
        }
      })

    });
  }
}