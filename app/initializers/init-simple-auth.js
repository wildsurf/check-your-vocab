import CustomAuthoriser from 'check-your-vocab/utils/authoriser';
import CustomAuthenticator from 'check-your-vocab/utils/authenticator';

export function initialize(container, app) {

  app.register('authenticator:custom', CustomAuthenticator);
  app.register('authorizer:custom', CustomAuthoriser);

}

export default {
  name: 'inject-simple-auth',
  before: 'simple-auth',
  initialize: initialize
};
