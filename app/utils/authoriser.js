import Base from 'simple-auth/authorizers/base';

export default Base.extend({

  authorize: function(jqXHR) {

    var authorisationToken = localStorage.getItem('token');

    jqXHR.setRequestHeader('Authorization', authorisationToken);

  }

});
