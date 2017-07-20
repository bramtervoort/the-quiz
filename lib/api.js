
Meteor.methods({
    'players.joinQuiz'(player) {
        if(Meteor.isServer)
            player.clientAddress = this.connection.clientAddress;
        var game = GamesCollection.findOne({pin: player.pin});
        if (!game || game.status != 'join') {
            throw new Meteor.Error('Geen open quiz voor ' + player.pin);
        }

        var key = PlayerCollection.insert(player);

        if(Meteor.isClient)
            Session.set('currentPlayer', key);
        return key;
    },
    'awnser.create'(awnser) {
        if(Meteor.isServer)
            awnser.clientAddress = this.connection.clientAddress;

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
    }
});
