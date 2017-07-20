
Router.route('/', function () {
    this.render('join');
});

Router.route('/create/:pin', function () {
    Meteor.call('games.create', this.params.pin);
    Router.go('/quiz/' + this.params.pin);
});

Router.route('/awnser', function () {
    if (!Session.get('currentPlayer')) {
        Router.go('/');
    }
    if (Session.get('awnser')) {
        Router.go('/wait');
    }
    var player = PlayerCollection.findOne({_id: Session.get('currentPlayer')});
    var game = GamesCollection.findOne({pin: player.pin});
    this.render('awnser', {
        data() {
            return {
                currentPlayer: player,
                game: game
            };
        }
    });
});

Router.route('/wait', function() {

    if (!Session.get('currentPlayer') || !Session.get('awnser')) {
        Router.go('/');
    }
    console.log('wait', {user: Session.get('currentPlayer'), awnser: Session.get('awnser')});
    this.render('wait');
});

Router.route('/quiz/:pin',
    function () {
        var game = GamesCollection.findOne({pin: this.params.pin});
        if (game.status === 'start') {
            Router.go('/vraag/1');
        }

        this.render('quiz', {
            data() {return {
                pin: this.params.pin,
                players: PlayerCollection.find({pin: this.params.pin})
            } }
        })
    });

Router.route('/result/1', function () {
    var data = AwnserCollection.find().fetch();
    var x = data.reduce(function (y, x) {
        y[x.awnser] += 1;
        return y;
    }, {a: 0, b: 0, c: 0, d: 0});
    this.render('result', {
        data() {
            return {
                topGenresChart: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: "Vraag 1"
                    },

                    xAxis: {
                        categories: ['A', 'B', 'C', 'D']
                    },
                    yAxis: {
                        title: {
                            text: 'resultaat'
                        }
                    },
                    series: [{data: [
                        {name: 'A', y: x['a'], color: 'green'},
                        {name: 'B', y: x['b']},
                        {name: 'C', y: x['c']},
                        {name: 'D', y: x['d']}
                    ]}]
                }
            };
        }
    });
});

Router.route('/vraag/1', function () {
    this.render('question');
});

Router.route('/crtl/:pin', function () {
    this.render('crtl', {
        data() {
            return {
                quiz: GamesCollection.findOne({pin:this.params.pin}),
                players: PlayerCollection.find({pin:this.params.pin})
            };
        }
    });
});
