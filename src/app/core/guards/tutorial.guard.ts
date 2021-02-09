import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class TutorialGuard implements CanActivate {
  constructor(private router: Router, private _storage: StorageService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('entre al guard')
    const isComplete = JSON.parse(this._storage.getItem('tutorialComplete'));
    console.log(isComplete)
    if(!isComplete){
      this.router.navigateByUrl('/welcome');
    }
    return isComplete;
  }
  
}
