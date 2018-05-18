import ApiFilterGroup from "./ApiFilterGroup";
import ApiRoutes from "./ApiRoutes";
import {Observable} from "rxjs";
import {RxHR} from "@akanass/rx-http-request";
import ApiFilter from "./ApiFilter";
import ReportApiLabels from './strings/activity_names';

class ReportApi {
    static GenerateActivityReport(page: number = 1, itemsPerPage: 25, filter: ApiFilter|ApiFilterGroup = null) {
        return new Observable(function (subscriber) {
            let route = ApiRoutes.REPORT_ACTIVITY;
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

    static LocalizedActivityLabel(activity_name: string) {
        const val = ReportApiLabels[activity_name];
        if ( val !== undefined ) {
            return val;
        }
        return activity_name;
    }
}

export default ReportApi;