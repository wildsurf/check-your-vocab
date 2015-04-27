import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

var spyOriginalCancel, originalRunCancel,
  spyOriginalLater, originalRunLater;

moduleForComponent('show-message', 'ShowMessageComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  setup: function() {
    spyOriginalCancel = sinon.spy();
    spyOriginalLater = sinon.spy();
    originalRunCancel = Ember.run.cancel;
    originalRunLater = Ember.run.later;
    Ember.run.cancel = spyOriginalCancel;
    Ember.run.later = function() {
      spyOriginalLater();
      return 'timeout';
    };
  },
  teardown: function() {
    Ember.run.cancel = originalRunCancel;
    Ember.run.later = originalRunLater;
  }
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('observer: messageObserver', function() {
  expect(4);

  var component = this.subject();

  component.set('timeout', 'earlier timeout');
  component.set('message', 'oh dear, there was an error');

  equal(component.get('message'), 'oh dear, there was an error', 'the message is added');
  equal(spyOriginalCancel.getCall(0).args[0], 'earlier timeout', 'earlier timeouts are cancelled');
  equal(spyOriginalLater.calledOnce, true, 'a run later function is added');
  equal(component.get('timeout'), 'timeout', 'the timeout is saved in timeout property');

});

test('action: deleteMessage', function() {
  expect(2);

  var component = this.subject();

  component.set('message', 'oh dear, there was an error');
  component.set('timeout', 'test');
  component.send('deleteMessage');

  equal(component.get('message'), null, 'the message is removed');
  equal(spyOriginalCancel.getCall(0).args[0], 'test', 'the auto timeout is cancelled');

});
