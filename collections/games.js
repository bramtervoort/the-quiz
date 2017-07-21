GamesCollection = new Mongo.Collection('games');
GamesSchema = new SimpleSchema({
    pin: {
        type: String,
        label: 'Pin'
    },
    status: {
        type: String,
        label: 'status'
    },
    cheats: {
        type: [String],
        optional: true
    }
});
GamesCollection.attachSchema(GamesSchema);
