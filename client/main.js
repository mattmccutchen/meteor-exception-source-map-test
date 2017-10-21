import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  var tmpl = this;
  Tracker.autorun(function() {
    if (tmpl.counter.get() > 0)
      throw new Error("Tracker error");
  });
});

Template.body.helpers({
  myHelper() {
    if (Template.instance().counter.get() > 0)
      throw new Error("Helper error");
    return "";
  },
});

Template.body.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

