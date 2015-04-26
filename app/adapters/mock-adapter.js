import Ember from 'ember';

export default {

    cache: {
    },

    leanFind: function (query, url) {

        var response = this.cache[url] ? _.filter(this.cache[url], query) : [];

        return new Ember.RSVP.Promise(function(resolve) {

            resolve(response);

        });

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

        var response = this.cache[url] ? _.find(this.cache[url], {_id: _id}) : {};

        return new Ember.RSVP.Promise(function(resolve) {

            resolve(modelClass.create(response));

        });

    },

    insert: function (data, url) {

        if (!this.cache[url]) {

            this.cache[url] = [];

        }

        data._id = new Date().getTime();

        this.cache[url].push(data);

        return new Ember.RSVP.Promise(function(resolve) {

            resolve(data);

        });

    },

    update: function (data, url) {

        var oldModel = _.find(this.cache[url], {_id: data._id});
        var newModel = _.merge(oldModel, data);

        oldModel = newModel;

        return new Ember.RSVP.Promise(function(resolve) {

            resolve(newModel);

        });

    },

    remove: function (data, url) {

        _.remove(this.cache[url], function(model) {

            return model._id === data._id;

        });

        return new Ember.RSVP.Promise(function(resolve) {

            resolve({});

        });

    }

};
