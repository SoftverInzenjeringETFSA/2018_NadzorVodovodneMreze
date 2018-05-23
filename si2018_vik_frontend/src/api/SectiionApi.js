import ApiFilterGroup from "./ApiFilterGroup";
import ApiFilter from "./ApiFilter";
import {Observable} from "rxjs";
import {RxHR} from "@akanass/rx-http-request";
import ApiRoutes from './ApiRoutes';

class SectionApi {
    static GetSections(page: number = 1, itemsPerPage: number = 25, filter: ApiFilter|ApiFilterGroup = null): Observable<Pipe[]> {
        return new Observable(function (subscriber) {
            let route = ApiRoutes.SECTION;
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
   
   static PatchSectionById(id,active): Observable<Pipe[]>  {
        return new Observable(function (subscriber) {
            let route = ApiRoutes.SECTION;
            console.log(active);
            route += '/' + encodeURIComponent(id);
            route+='?active='+active;
            console.log(route);
            RxHR.patch(route).subscribe(
                function(value) {
                    console.log(value);
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


export default SectionApi;
