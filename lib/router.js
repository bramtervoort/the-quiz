
Router.route('/', function () {
    this.render('join');
});

Router.route('/awnser', function () {
    this.render('awnser', {
        data() {
            console.log('tty', Session.get('currentPlayer'))
            return {
                currentPlayer: PlayerCollection.findOne({_id: Session.get('currentPlayer')})
            };
        }
    });
});

Router.route('/wait', function() {
    this.render('wait');
});

Router.route('/quiz/:pin',
    function () {
        console.log(this.params);
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

Router.route('/crtl', function () {
    this.render('crtl');
});
