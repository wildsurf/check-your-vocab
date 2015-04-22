import Ember from 'ember';
import Server from './server';

export function makeRequest(url, options, promise) {

    $.support.cors = true;
    $.ajax(url, options)
        .success(function(xhr, textStatus, jqXHR) {

            if (jqXHR.getResponseHeader('totalItems')) {
                xhr.totalItems = parseInt(jqXHR.getResponseHeader('totalItems'), 10);
            }

            if (xhr && !_.isEmpty(xhr.error)) {
                Ember.run(promise, promise.reject, xhr);
            } else {
                Ember.run(promise, promise.resolve, xhr);
            }

        })
        .fail(function(xhr, textStatus, error) {

            console.log('Response 4xx or 5xx');
            console.log('Text status: ' + textStatus);
            console.log('Error: ' + error);

            Ember.run(promise, promise.reject, xhr);

        })
        .complete(function () {
            Ember.run(function () {
                if (!options || (options && !options.noLoader)) {
                    var serverStatus = Server.serverStatus;
                    serverStatus.set('requestCount', serverStatus.get('requestCount') - 1);
                    if (serverStatus.get('requestCount') === 0) {
                        serverStatus.set('isProcessingRequest', false);
                    }
                }
            });
        });

}

export default {
    makeRequest: makeRequest
};
