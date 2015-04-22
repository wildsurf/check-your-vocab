import ENV from 'check-your-vocab/config/environment';

var windowFunctions = {

    locationReload: function() {

        if(ENV.environment !== 'test') {

            window.location.reload();

        }
    },


    localStorage: {

        store: {},

        getItem: function(key) {

            if(ENV.environment === 'test') {

                return windowFunctions.localStorage.store.key;

            } else {

                return window.localStorage.getItem(key);

            }

        },
        setItem: function(key, value) {

            if(ENV.environment === 'test') {

                windowFunctions.localStorage.store.key = value;

            } else {

                window.localStorage.setItem(key, value);

            }

        },

        removeItem: function(key) {

            if(ENV.environment === 'test') {

                delete windowFunctions.localStorage.store.key;

            } else {

                window.localStorage.removeItem(key);

            }

        }

    }

};

export default windowFunctions;
