import windowFunctions from 'check-your-vocab/utils/window-functions';

export function initialize(container, app) {

  app.register('window:main', windowFunctions, {instantiate: false});
  app.inject('controller', 'window', 'window:main');
  app.inject('route', 'window', 'window:main');
  app.inject('view', 'window', 'window:main');
}

export default {
  name: 'inject-window',
  initialize: initialize
};
