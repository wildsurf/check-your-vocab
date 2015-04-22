import Ember from 'ember';
import ENV from 'check-your-vocab/config/environment';
import Server from './server';

var server;

export function makeRequest(url, options, promise) {

  var requests = ENV.testApp.fakeRequests || [];
  var callback = sinon.spy();

  server = sinon.fakeServer.create();

  var fakeResponse = Ember.merge({
      path: url,
      url: url,
      method: 'get',
      status: 200,
      type: 'application/javascript',
      data: {}
  }, requests[ENV.testApp.requestsProcessed]);

  fakeResponse.data = JSON.stringify(fakeResponse.data);
  fakeResponse.requestData = options.data;
  options.data = null;

  server.respondWith( fakeResponse.method, url,
    [
      fakeResponse.status,
      {'Content-Type': fakeResponse.type},
      fakeResponse.data
    ]
  );

  $.ajax(url, options)
    .success(function(data) {

      Ember.run(promise, promise.resolve, data);

    })
    .fail(function(data) {

      Ember.run(promise, promise.reject, data);

    })
    .complete(function() {
        Ember.run(function () {
          callback(fakeResponse);
          ENV.testApp.serverSpy = callback.getCall(0).args[0];
            if (!options || (options && !options.noLoader)) {
                var serverStatus = Server.serverStatus;
                serverStatus.set('requestCount', serverStatus.get('requestCount') - 1);
                if (serverStatus.get('requestCount') === 0) {
                    serverStatus.set('isProcessingRequest', false);
                }
            }
        });

    });

  server.respond();

  ENV.testApp.requestsProcessed++;

  server.restore();

}

export default {
  makeRequest: makeRequest
};
