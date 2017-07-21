
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
    this.render('wait');
});

Router.route('/quiz/:pin',
    function () {
        var game = GamesCollection.findOne({pin: this.params.pin});
        if (game.status === 'start') {
            Router.go('/vraag/' + this.params.pin);
        }

        this.render('quiz', {
            data() {return {
                pin: this.params.pin,
                players: PlayerCollection.find({pin: this.params.pin})
            } }
        })
    }, {
        onBeforeAction() {
            $('body').addClass('bgthing');
            this.next();
        },
    });

Router.route('/result/:pin', function () {
    var game = GamesCollection.findOne({pin: this.params.pin});
    var data = AwnserCollection.find().fetch();
    var x = data.reduce(function (result, x) {
        if(x.awnser === 'a' && game.cheats && game.cheats.indexOf(x.clientAddress) >= 0) {
            console.log(x.awnser, x.clientAddress);
            result['b'] += 1;
        } else {
            result[x.awnser] += 1;
        }
        return result;
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

Router.route('/vraag/:pin', function () {

    this.render('question', {data() {

        var game = GamesCollection.findOne({pin: this.params.pin});
        if (game.status === 'result') {
            Router.go('/result/' + this.params.pin);
        }
    }});
});

Router.route('/crtl/:pin', function () {
    this.render('crtl', {
        data() {
            players = PlayerCollection.find({pin:this.params.pin});
            ips = players.fetch().reduce(function (result, data) {
                if(!result.hasOwnProperty([data.clientAddress])) {
                    result[data.clientAddress] = 1;
                } else {
                    result[data.clientAddress] += 1;
                }
                return result;
            }, {});
            clientAddress = [];
            for(var ip in ips) {
                clientAddress.push({ip: ip, cnt: ips[ip]});
            }

            return {
                quiz: GamesCollection.findOne({pin:this.params.pin}),
                players: players,
                clientAddress: clientAddress
            };
        }
    });
});
