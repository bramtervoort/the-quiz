AwnserCollection = new Mongo.Collection('awnsers');
AwnserSchema = new SimpleSchema({
    pin: {
        type: String,
        label: 'Pin'
    },
    awnser: {
        type: String,
        label: 'Awnser'
    },
    player: {
        type: String,
    }
});
AwnserCollection.attachSchema(AwnserSchema);
