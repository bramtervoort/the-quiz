// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

AutoForm.addHooks(['submitPlayersForm'], {
  onSuccess() {
    Router.go('/awnser');
  }
});

Template.awnser.events({
    'click .awnser-a'(event, instance) {
        var player = PlayerCollection.findOne({_id: Session.get('currentPlayer')});
        Meteor.call('awnser.create', {
            pin: player.pin,
            player: player._id,
            awnser: 'a'
        });
        Router.go('/wait');
    },
    'click .awnser-b'(event, instance) {
        var player = PlayerCollection.findOne({_id: Session.get('currentPlayer')});
        Meteor.call('awnser.create', {
            pin: player.pin,
            player: player._id,
            awnser: 'b'
        });
        Router.go('/wait');
    },
    'click .awnser-c'(event, instance) {
        var player = PlayerCollection.findOne({_id: Session.get('currentPlayer')});
        Meteor.call('awnser.create', {
            pin: player.pin,
            player: player._id,
            awnser: 'b'
        });
        Router.go('/wait');
    },
    'click .awnser-d'(event, instance) {
        var player = PlayerCollection.findOne({_id: Session.get('currentPlayer')});
        Meteor.call('awnser.create', {
            pin: player.pin,
            player: player._id,
            awnser: 'b'
        });
        Router.go('/wait');
    }
});

// Template.home.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });
//
// Template.home.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
//     players() {
//       return PlayerCollection.find({});
//     }
// });
//
// Template.home.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
