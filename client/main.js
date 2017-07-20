// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
var join_error = new ReactiveVar();

AutoForm.addHooks(['submitPlayersForm'], {
    onSuccess() {
        Router.go('/awnser');
    },
    onError(type, error) {
        join_error.set(error.error);
        console.log(error.error);
    }
});

Template.crtl.events({
    'click button#startquiz'(event, instance) {
        Meteor.call('games.start', instance.data.quiz._id, 'start');
    }
});

Template.join.helpers({
    error_msg() {
        return join_error.get();
    }
});

Template.awnser.events({
    'click .awnser-a'(event, instance) {
        if (instance.data.game.status !== 'start') {
            return;
        }
        var player = PlayerCollection.findOne({_id: Session.get('currentPlayer')});
        Meteor.call('awnser.create', {
            pin: player.pin,
            player: player._id,
            awnser: 'a'
        });
        Router.go('/wait');
    },
    'click .awnser-b'(event, instance) {
        if (instance.data.game.status !== 'start') {
            return;
        }
        var player = PlayerCollection.findOne({_id: Session.get('currentPlayer')});
        Meteor.call('awnser.create', {
            pin: player.pin,
            player: player._id,
            awnser: 'b'
        });
        Router.go('/wait');
    },
    'click .awnser-c'(event, instance) {
        if (instance.data.game.status !== 'start') {
            return;
        }
        var player = PlayerCollection.findOne({_id: Session.get('currentPlayer')});
        Meteor.call('awnser.create', {
            pin: player.pin,
            player: player._id,
            awnser: 'b'
        });
        Router.go('/wait');
    },
    'click .awnser-d'(event, instance) {
        if (instance.data.game.status !== 'start') {
            return;
        }
        var player = PlayerCollection.findOne({_id: Session.get('currentPlayer')});
        Meteor.call('awnser.create', {
            pin: player.pin,
            player: player._id,
            awnser: 'b'
        });
        Router.go('/wait');
    }
});

