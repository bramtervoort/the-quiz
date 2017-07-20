GamesCollection = new Mongo.Collection('games');
GamesSchema = new SimpleSchema({
    pin: {
        type: String,
        label: 'Pin'
    },
    status: {
        type: String,
        label: 'status'
    }
});
GamesCollection.attachSchema(GamesSchema);
