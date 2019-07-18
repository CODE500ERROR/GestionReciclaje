import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { HttpRequest } from "selenium-webdriver/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";



@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        );
    }
}