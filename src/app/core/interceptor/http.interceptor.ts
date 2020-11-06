import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { LoaderService } from '../../core/services/loader.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { ToastService } from '../../core/services/toast.service';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    constructor(
        private loaderService: LoaderService,
        private router: Router,
        private toast: ToastService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.showLoader()
        let auth = "";
        let token = localStorage.getItem('token');
        console.log('Interceptor...')
        if (token) {
            auth = 'Bearer ' + token;
        }
        let jsonReq: HttpRequest<any> = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': auth
            }
        });

        return next.handle(jsonReq).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error)
                if(error.status == 401){
                    this.clearAndLoginRedirect();
                }
                if(error.error.message){
                    this.toast.errorToast(error.error.message);
                }else{
                    this.toast.errorToast('Ha ocurrido un problema');
                }           
                return throwError(error);
            }),        
            finalize(() => {
                this.loaderService.hideLoader();
            })
        );
    }
    private clearAndLoginRedirect() {
        localStorage.clear();
        this.router.navigate(['login']);
    }
}