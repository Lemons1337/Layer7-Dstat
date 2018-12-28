window.addEventListener('load', () => {

    let websocket = new WebSocket('ws://' + document.domain + ':{port}');

    Highcharts.chart('graph', {
        chart: {
            type: 'spline',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
                load: function () {
                    var series = this.series[0];
                    websocket.onmessage = async message => {
                        var json = await JSON.parse(message.data);
                        var date = await new Date();
                        var x = await date.getTime();
                        var y = await json.requests;
                        await series.addPoint([x, y], true, true);
                    }
                }
            }
        },

        time: {
            useUTC: false
        },
        title: {
            text: 'http://' + document.domain,
            style: {
                color: "#00FF00"
            }
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Requests'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y} r/s'
        },
        series: [{
            name: 'Requests per second',
            color: '#00FF00',
            data: function () {
                var data = [];
                var date = new Date();
                var time = date.getTime();

                for (var i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            }()
        }]
    });

    document.querySelector('.highcharts-credits').remove();
});