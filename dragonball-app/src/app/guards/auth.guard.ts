import { inject } from '@angular/core';

import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthsessionService } from '@services/authsession.service';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {

    const router = inject(Router);
    const ss = inject(AuthsessionService);

    if (!ss.isAuto) {
        router.navigate(['/'])
        return false
    }
    return true;
};
