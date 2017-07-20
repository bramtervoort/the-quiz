
Meteor.methods({
    'players.joinQuiz'(player) {
        if(Meteor.isServer)
            player.clientAddress = this.connection.clientAddress;

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
    }
});
