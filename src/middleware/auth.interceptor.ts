import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class authInterceptor implements NestInterceptor {

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const args = context.getArgs();

        return await next.handle().toPromise()
    }
}