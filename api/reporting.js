const FilterUtils = require('./filter_utils').FilterUtils;
const LoggingEvent = require('./../models/logged_event');


logEvent = function(userId, action) {
    LoggingEvent.create({
        user_id: userId,
        activity: action
    })
};


module.exports = {
    Reporting: {
        LogPipeAdd: function(userId) {logEvent(userId, 'pipe_add');},
        LogSectionDisable: function(userId) {logEvent(userId, 'section_disable');},
        LogSectionEnable: function(userId) {logEvent(userId, 'section_enable');},
        LogPipeRemove: function(userId) {logEvent(userId, 'pipe_remove');},
        LogConstructionAdd: function(userId) {logEvent(userId, 'construction_add');},
        LogConstructionRemove: function(userId) {logEvent(userId, 'construction_remove');},
        LogMstationAdd: function(userId) {logEvent(userId, 'mstation_add');},
        LogMstationRemove: function(userId) {logEvent(userId, 'mstation_remove');},
        LogFailureAdd: function(userId) {logEvent(userId, 'failure_add');},
        LogFailureRemove: function(userId) {logEvent(userId, 'failure_remove');},

        GenerateReport: function(filter, page, perPage) {
            return LoggingEvent.find().skip(parseInt(page * perPage)).limit(parseInt(perPage));
        },
        ReportCount: function(filter) {
            return LoggingEvent.count();
        }
    },
    Routing: {

    }

};
