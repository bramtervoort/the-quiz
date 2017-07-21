
Meteor.methods({
    'players.joinQuiz'(player) {
        if(Meteor.isServer) {
            player.clientAddress = this.connection.httpHeaders['x-real-ip'];
        }
        var game = GamesCollection.findOne({pin: player.pin});
        if (!game || game.status != 'join') {
            throw new Meteor.Error('Geen open quiz voor ' + player.pin);
        }

        var players = PlayerCollection.find({pin:player.pin, name: player.name});
        if (players.count() > 0){
            throw new Meteor.Error('Er is al een speler met de naam ' + player.name);
        }

        var key = PlayerCollection.insert(player);

        if(Meteor.isClient)
            Session.set('currentPlayer', key);
        return key;
    },
    'awnser.create'(awnser) {
        if(Meteor.isServer)
            awnser.clientAddress = this.connection.httpHeaders['x-real-ip'];

        key = AwnserCollection.insert(awnser);
        if(Meteor.isClient)
            Session.set('awnser', key);
        return key;
    },
    'games.create'(pin) {
        PlayerCollection.remove({pin: pin});
        AwnserCollection.remove({pin: pin});
        GamesCollection.remove({pin: pin});

        return GamesCollection.insert({pin: pin, status: 'join'});
    },
    'games.start'(_id, status) {
        GamesCollection.update({_id: _id}, {$set:{status: status}});
    },
    'games.cheat'(_id, cheats) {
        GamesCollection.update({_id: _id}, {$set:{cheats: cheats}});
    }
});
