import { HttpRequest } from "selenium-webdriver/http";
import { HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";


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