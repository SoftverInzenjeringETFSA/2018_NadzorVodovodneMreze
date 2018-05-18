
// set to localhost when developing
//const API_ROOT = 'https://si2018backend.herokuapp.com';

const API_ROOT = 'http://localhost:8080/api';

class ApiRoutes {
    static PIPES = API_ROOT + '/pipes';
    static FAILURES = API_ROOT + '/failures';
    static CONSTRUCTIONS = API_ROOT + '/constructions';
    static MEASURE_STATIONS = API_ROOT + '/measure_stations';
    static REPORT_ACTIVITY = API_ROOT + '/report';
    static VODOSTAJI = API_ROOT + '/vodostaji';
}


export default ApiRoutes;
