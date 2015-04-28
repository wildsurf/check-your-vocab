import Server from 'check-your-vocab/utils/server';

export default {

    leanFind: function (query, url, noLoader) {

        return Server.invoke('GET', url, query, noLoader);

    },

    find: function (query, url, modelClass, noLoader) {

        return this.leanFind(query, url, noLoader).then(function (data) {

            var models = _.map(data, function (model) {

                return modelClass.create(model);

            });

            models.totalItems = data.totalItems;

            return models;

        });

    },

    findOne: function (query, url, modelClass, noLoader) {

        query.limit = 1;

        return this.leanFind(query, url || this.resourceUrl, noLoader).then(function (data) {

            return modelClass.create(data[0]);

        });

    },

    findById: function (_id, url, modelClass) {

        return Server.invoke('GET', url + '/' + _id).then(function (data) {

            return modelClass.create(data);

        });

    },

    insert: function (data, url) {

        if (data.serialize) {
            data = data.serialize();
        }

        return Server.invoke('POST', url, data);

    },

    update: function (data, url) {

        if (_.isArray(data)) {
            return Server.invoke('PUT', url, data);
        }

        if (data.serialize) {
            data = data.serialize();
        }

        return Server.invoke('PUT', url + '/' + data._id, data);

    },

    updateGeneric: function(data, url) {

        return Server.invoke('PUT', url, data);

    },

    remove: function (data, url) {

        if (_.isArray(data)) {

            return Server.invoke('DELETE', url, data);

        }

        return Server.invoke('DELETE', url + '/' + data);

    }

};
