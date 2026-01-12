import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const api_token = localStorage.getItem('api_token');

  let newReq = req;


  if (api_token) {
    newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${api_token}`
      }
    });
  }
  console.log(newReq.headers)
  return next(newReq);
};