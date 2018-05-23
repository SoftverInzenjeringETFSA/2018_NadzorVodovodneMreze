const FilterUtils = require('./filter_utils').FilterUtils;
const Reporting = require('./reporting').Reporting;
const fs = require('fs');


function makeListConsumer(fpath) {
    if ( !fs.existsSync(fpath) ) {
        throw fpath + " doesn't exist!";
    }

    return function(req, res) {
        let data = JSON.parse(fs.readFileSync(fpath)).filter(function(elem) {
            if ( elem.hasOwnProperty("deleted") && elem.deleted === true ) {
                return false;
            }
            return true;
        });

        if ( req.query.filter !== undefined ) {
            let apiFilter = JSON.parse(req.query.filter);

            FilterUtils.applyFilter(data, apiFilter);
        }


        res.send(JSON.stringify(data));
    }
}

module.exports = {
    registerRoutes: function registerRoutes(express) {
        //express.get('/pipes', makeListConsumer(__dirname + '/repo/pipes.json'));

       // express.get('/vodostaji', makeListConsumer(__dirname + '/repo/vodostaji.json'));
        // reporting
        express.get('/api/report', function(req, res) {
            let apiFilter = null;
            if ( req.query.filter !== undefined ) {
                apiFilter = JSON.parse(req.query.filter);
            } else {
                apiFilter = {
                    type: "group",
                    operator: "and",
                    operands: []
                };
            }


            Reporting.GenerateReport(apiFilter, req.query.page, req.query.itemsPerPage).then(function(report) {
                Reporting.ReportCount(apiFilter).then(count => {
                    res.send(JSON.stringify({
                        data: report,
                        total: count
                    }));
                })
            });
        });
    }
};

