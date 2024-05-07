import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { GlobalErrorService } from './global-error.service';
import { GlobalLoadingService } from './global-loading.service';
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private errorService = inject(GlobalErrorService);
  private loadingService = inject(GlobalLoadingService);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.loadingService.startLoading();
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.errorService.showError(errorMessage);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.stopLoading()),
    );
  }
}
