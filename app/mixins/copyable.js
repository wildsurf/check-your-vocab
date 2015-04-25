import Ember from 'ember';

export default Ember.Mixin.create(Ember.Copyable, {

    copy: function(options){
        if(options && options.deep){
            var copy = _.cloneDeep(this);
            return (this.constructor).create(copy);
        }
        else {
            var deepCopy = _.clone(this);
            return (this.constructor).create(deepCopy);
        }
    }

});
