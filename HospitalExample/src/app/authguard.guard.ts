import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authguardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const role = localStorage.getItem('userRole');

  console.log('Auth Guard - User Role:', role);
  console.log('Requested Route:', state.url); // Debugging

  if ((role === 'admin' && state.url.startsWith('/admin')) ||
      (role === 'doctor' && state.url.startsWith('/doctor')) ||
      (role === 'patient' && state.url.startsWith('/patient'))) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
