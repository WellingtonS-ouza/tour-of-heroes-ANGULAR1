import { MessageService } from './../service/message.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (!environment.production) {
          console.log(err)
        }


        let errorMsg = ''

        if (err.error instanceof ErrorEvent) {
          errorMsg = `Error ${err.error.message}`
        } else if (Array.isArray(err.error) && err.error.length) {
          errorMsg = `Error: ${err.error[1]}`
        } else if (err.error.error) {
          errorMsg = `Error: ${err.error.error}`
        } else {
          errorMsg = `Error Code ${err.status}, Message: ${err.message}`
        }

        this.messageService.add(errorMsg)
        return throwError(() => new Error(errorMsg))
      })
    )
  }
}
