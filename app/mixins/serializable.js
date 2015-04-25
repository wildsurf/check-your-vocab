import Ember from 'ember';

export default Ember.Mixin.create({

    upperCaseTest: new RegExp('[A-Z]'),

    serialize: function() {

        var v, json = {};

        for(var key in this) {
            if(this.hasOwnProperty(key)) {

                if(key === '_dependentValidationKeys') {
                    continue;
                }

                if(key === 'propertyIsInvalid') {
                    continue;
                }

                if(key === 'errors') {
                    continue;
                }

                v = this[key];
                if(v === 'toString') {
                    continue;
                }

                if(Ember.typeOf(v) === 'function') {
                    continue;
                }

                if(key === 'validators') {
                    continue;
                }

                if(this.upperCaseTest.test(key[0])) {
                    continue;
                }

                json[key] = v;
            }
        }

        return json;

    }

});
