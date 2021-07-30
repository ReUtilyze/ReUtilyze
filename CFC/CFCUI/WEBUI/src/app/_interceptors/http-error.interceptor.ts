import { Injectable } from '@angular/core';
import { AlertService } from './../services/alert/alert.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
            catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
                console.log('this is client side error');
                errorMsg = `${error.error.message}`;
            }
            else {
                console.log(request);
                switch(error.status) { 
                    case 0: { 
                        errorMsg = 'Not connected.\n Verify Network.';
                        break; 
                    } 
                    case 404: {
                        errorMsg = 'Requested page not found. [404]';
                        break; 
                    } 
                    case 500: { 
                        errorMsg = 'Internal Server Error [500].';
                        break; 
                    }
                    case 401: {
                        errorMsg = 'Unauthorized user [401].';
                        if(request.url.includes('api/v1/Account/Authenticate'))
                            errorMsg = 'Invalid User Name / Password. Please try again.';
                        break; 
                    } 
                    default: { 
                        errorMsg = 'Uncaught Error.\n';
                        break; 
                    }
                }
            }
            this.alertService.error(errorMsg);
            return throwError(errorMsg);
            })
        )
    }
}