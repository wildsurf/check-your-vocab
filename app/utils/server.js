import Ember from 'ember';
import ENV from 'check-your-vocab/config/environment';
import Ajax from './ajax-requests';
import Mock from './mock-requests';

var serverStatus = Ember.Object.create({
    isProcessingRequest: false,
    requestCount: 0
});

export function getBaseUrl() {

    if ('withCredentials' in new XMLHttpRequest()) {
        /* supports cross-domain requests */
        return window.location.protocol + '//' + ENV.APP.server.url + '/';

    }

    return '/';

}

export function invoke(method, resource, data, options) {

    var now = (new Date()).getTime();
    var url = getBaseUrl() + resource;
    var Connection = Ajax;

    if(ENV.environment === 'test') {
        Connection = Mock;
    }

    if(url.match(/\?/)) {
        url += '&v=' + now;
    } else {
        url += '?v=' + now;
    }

    if (!options || (options && !options.noLoader)) {
        serverStatus.set('isProcessingRequest', true);
        serverStatus.set('requestCount', serverStatus.get('requestCount') + 1);
    }

    var defaults = {
        headers:  {},
        dataType: 'json',
        type:     method,
        accept:   'application/json',
        timeout:  30000
    };

    options = _.extend(defaults, options);

    var authToken = localStorage.getItem('token');

    if(authToken) {
        options.headers = {
            Authorization: authToken
        };
    }

    // we need to manually call JSON.stringify and set the contentType to prevent JQuery from converting
    //the data to formencoded representation
    //TODO automatically turn xdate to isostring
    if(! _.isNull(data) && ! _.isUndefined(data)) {
        if(method.toUpperCase() === 'GET') {
            options.data = data;
        }
        else {
            options.contentType = 'application/json; charset=UTF-8';
            options.data = JSON.stringify(data);
        }
    }

    // Wrapper for jQuery promise
    return new Ember.RSVP.Promise(function(promise) {
        Connection.makeRequest(url, options, promise);
    });

}

export default {
    invoke: invoke,
    serverStatus: serverStatus,
    getBaseUrl: getBaseUrl
};
