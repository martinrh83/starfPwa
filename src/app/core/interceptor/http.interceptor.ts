import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, finalize, switchMap, filter, take, timeout } from 'rxjs/operators';
import { LoaderService } from '../../core/services/loader.service';
import { Router } from '@angular/router';
import { RouterService } from '../../core/services/router.service';
import { HttpService } from '../services/http.service';
import { __await } from 'tslib';
import { ToastService } from '../../core/services/toast.service';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    private reqs = 0;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private isRefreshing = false;
    inflightAuthRequest = null;
    constructor(
        private http: HttpService,
        private loaderService: LoaderService,
        private router: Router,
        private toast: ToastService,
        private injector: Injector,
        private routerService: RouterService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.showLoader()
        let auth = "";
        let token = localStorage.getItem('token');
        console.log('entre')
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

        this.reqs++;
        if (jsonReq.url.endsWith('/login')) {
            return next.handle(jsonReq).pipe(
                map((event: HttpEvent<any>) => {
                    this.restartReqs();
                    return event;
                }),
                catchError(error => {
                    this.restartReqs();
                    this.toast.errorToast("El usuario o la contraseña son invalidos");
                    this.http.showCredError();
                    return throwError(error);
                })
            )
        }
        if (jsonReq.url.endsWith("/token")) {
            return next.handle(jsonReq).pipe(
                catchError(error => {
                    this.routerService.setCancelUrl(this.routerService.getCurrentUrl());
                    return throwError(error);
                }))
        }

        return next.handle(jsonReq).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.restartReqs();
                    if (event.status != 200) {
                    }
                }

                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.restartReqs();

                if (this._checkTokenExpiryErr(error)) { return this.handle401Error(jsonReq, next); }

                let msg = JSON.parse(error.error).message;
                //Swal.fire(this.prepareSwal('error', 'Oops...', msg));
                this.toast.errorToast(msg);
                return throwError(error);
            }),
        );
    }

    restartReqs() {
        this.reqs--;
        if (this.reqs <= 0) {
            this.loaderService.hideLoader();
        }
    }
    private _checkTokenExpiryErr(error: HttpErrorResponse): boolean {
        return (
            error.status &&
            error.status === 401 &&
            error.error &&
            error.error.message === 'Token has expired'
        );
    }
    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return null;
            /*
                Reemplazar con url de api para renovación de token
            */

            // return this.appService.renewToken().pipe(
            //     switchMap((token: any) => {
            //         this.refreshTokenSubject.next(token.token);
            //         this.restartReqs();
            //         this.isRefreshing = false;
            //         return next.handle(this.addToken(request, token.token));
            //     }), catchError((error => {
            //         this.clearAndLoginRedirect();
            //         return throwError(error);
            //     })));

        } else {
            return this.refreshTokenSubject.pipe(
                switchMap(jwt => {
                    this.restartReqs();
                    return next.handle(this.addToken(request, jwt)).pipe(
                        catchError(error => {
                            this.clearAndLoginRedirect();
                            return throwError(error);
                        })
                    );
                }));
        }
    }
    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    private clearAndLoginRedirect() {
        localStorage.clear();
        sessionStorage.clear();
        this.restartReqs();
        this.router.navigate(['login']);
    }
}