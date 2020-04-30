import { getInstance } from './index';

export const authGuard = (to, from, next) => {
  console.log('in authGuard');
  const authService = getInstance();

  const fn = () => {
    //if user is authenticated continue
    if (authService.isAuthenticated) {
      return next();
    }
    //if not, login
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };

  //if loading is finished, check auth state using fn()
  if (!authService.loading) {
    return fn();
  }

  //watch for the loading property to change before we check isAuthenticated
  authService.$watch('loading', (loading) => {
    if (loading === false) {
      return fn();
    }
  });
};
