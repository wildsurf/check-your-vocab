import allGlobals from 'check-your-vocab/utils/globals';

export function initialize(container, app) {

  var globals = allGlobals;

  app.register('globals:main', globals, {instantiate: false});
  app.inject('controller', 'globals', 'globals:main');
  app.inject('view', 'globals', 'globals:main');
}

export default {
  name: 'inject-globals',
  initialize: initialize
};
