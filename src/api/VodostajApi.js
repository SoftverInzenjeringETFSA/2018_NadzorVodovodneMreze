import ApiFilterGroup from "./ApiFilterGroup";
import ApiFilter from "./ApiFilter";
import {Observable} from "rxjs";
import {RxHR} from "@akanass/rx-http-request";
import ApiRoutes from './ApiRoutes';
import Vodostaj  from './model/Vodostaj';

class VodostajApi {
    static GetVodostaji(page: number = 1, itemsPerPage: number = 25, filter: ApiFilter|ApiFilterGroup = null): Observable<Vodostaj[]> {
        return new Observable(function (subscriber) {
            let route = ApiRoutes.VODOSTAJI;
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
}