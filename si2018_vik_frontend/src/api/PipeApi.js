import ApiFilterGroup from "./ApiFilterGroup";
import ApiFilter from "./ApiFilter";
import {Observable} from "rxjs";
import {RxHR} from "@akanass/rx-http-request";
import ApiRoutes from './ApiRoutes';
import Pipe from './model/Pipe';

class PipeApi {
    static GetPipes(page: number = 1, itemsPerPage: number = 25, filter: ApiFilter|ApiFilterGroup = null): Observable<Pipe[]> {
        return new Observable(function (subscriber) {
            let route = ApiRoutes.PIPES;
            if ( filter !== undefined && filter !== null ) {
                route += '?filter=' + encodeURIComponent(JSON.stringify(filter)) + '&';
            } else {
                route += '?';
            }

            route += 'page=' + encodeURIComponent(page);
            route += '&itemsPerPage=' + encodeURIComponent(itemsPerPage);

            RxHR.get(route).subscribe(
                function(value) {
                    subscriber.next(JSON.parse(value.response.body));
                    subscriber.complete();
                },
                function(error) {
                    subscriber.error(error);
                    subscriber.complete();
                }
            )
        });
    }
    static GetPipeById(id): Observable<Pipe[]> {
        return new Observable(function (subscriber) {
            let route = ApiRoutes.PIPES;

            route += '/' + encodeURIComponent(id);
            console.log(route);

            RxHR.get(route).subscribe(
                function(value) {
                    subscriber.next(JSON.parse(value.response.body));
                    subscriber.complete();
                    console.log(value);
                },
                function(error) {
                    subscriber.error(error);
                    subscriber.complete();
                }
            )
        });
    }
    static PatchPipeById(id): Observable<Pipe[]> {
        return new Observable(function (subscriber) {
            let route = ApiRoutes.PIPES;

            route += '/' + encodeURIComponent(id);
            console.log(route);

            RxHR.patch(route, {"status":"workInProgress"}).subscribe(
                function(value) {
                    subscriber.next(JSON.parse(value.response.body));
                    subscriber.complete();
                    console.log(value);
                },
                function(error) {
                    subscriber.error(error);
                    subscriber.complete();
                }
            )
        });
    }
}


export default PipeApi;
