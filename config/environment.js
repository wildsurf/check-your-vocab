/* jshint node: true */
module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'check-your-vocab',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      I18N_COMPILE_WITHOUT_HANDLEBARS: true,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
        I18N_TRANSLATE_HELPER_SPAN: false
      }
    },

    contentSecurityPolicy: {
      'report-uri': 'http://localhost:4200',
      'style-src':  "'self' 'unsafe-inline' http://fonts.googleapis.com" // jshint ignore:line
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      currentLocale: 'de'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.useMocks = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.useMocks = true;
  }

  if (environment === 'production') {

  }

  return ENV;
};
