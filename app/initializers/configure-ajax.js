export function initialize() {

  $.ajaxPrefilter( function( options ) {
    options.crossDomain ={
      crossDomain: true
    };
    options.xhrFields = {
      withCredentials: true
    };
  });
}

export default {
  name: 'configure-ajax',
  initialize: initialize
};
