import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const token = localStorage.getItem('token');

  let newReq = req;


  if (token) {
    newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  console.log(newReq.headers)
  return next(newReq);
};