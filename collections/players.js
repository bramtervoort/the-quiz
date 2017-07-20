PlayerCollection = new Mongo.Collection('players');
PlayerSchema = new SimpleSchema({
    pin: {
        type: String,
        label: 'Pin'
    },
    name: {
        type: String,
        label: 'Naam'
    },
    clientAddress: {
        type: String,
        optional: true,
        autoform: {
            type: 'hidden'
        }
    }
});
PlayerCollection.attachSchema(PlayerSchema);

