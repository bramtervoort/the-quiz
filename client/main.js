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
        handle = setInterval(function () {
            console.log('time');
            clearInterval(handle);
            Meteor.call('games.start', instance.data.quiz._id, 'result');
        }, 15000);
    },
    'click button.ip-hide'(event, instance) {
        var cheats = instance.data.quiz.cheats;
        if (!cheats) {
            cheats = [];
        }
        cheats.push($(event.target).data('ip'));
        console.log($(event.target).data('ip'), instance.data.quiz, cheats);
        Meteor.call('games.cheat', instance.data.quiz._id, cheats);
    },
    'click button#clear-cheats'(event, instance) {
        Meteor.call('games.cheat', instance.data.quiz._id, []);
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
            awnser: 'c'
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
            awnser: 'd'
        });
        Router.go('/wait');
    }
});
