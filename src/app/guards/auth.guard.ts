import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('user')) {
            // user is logged in and can access the page
            return true;
        }
            // user is not logged in, so return to the login page with the return url
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
    }
}
