var helpers = {

    utils: {

        jsonClone: function(obj) {
            var clonedObj;

            if (obj) {

                clonedObj = JSON.parse(JSON.stringify(obj));

            }

            return clonedObj;
        }

    }

};

export default helpers;
