(function ($) {

    $.fn.flyChart = function (options) {
        let settings = $.extend({
            type: 'pie',
            data: [],
            legend: true
        }, options);

        const buildGradients = (data) => {
            const green = "#109618"
                , green2 = "#66aa00"
                , blue = "#0099c6"
                , blue2 = "#3366CC"
                , blue3 = "#316395"
                , yellow = "#ff9900"
                , orange = "#fd7e14"
                , red = "#dd4477"
                , red2 = "#dc3912"
                , red3 = "#b82e2e"
                , purple = "#990099"
                , purple2 = "#994499";

            const gradients = [
                [blue, blue2, blue3, green, green2, yellow, orange, red, red2, red3, purple, purple2],
                [blue, blue2, green, green2, yellow, orange, red, red2, purple],
                [blue, green, yellow, orange, red2, purple],
                [green, yellow, orange, red2],
                [green, yellow, red2]
            ];

            const res = gradients.filter(g => g.length >= data.length);
            return res[res.length - 1] || gradients[0];
        };

        const isBar = (settings.type === 'bar' || settings.type === 'horizontalBar');

        const mapData = (vals) => {
            vals.sort((a, b) => (a.rank || 0 > b.rank || 1) ? 1 : -1);
            return {
                labels: vals.map(d => d.label),
                datasets: [{
                    data: vals.map(d => d.value || 0.01),
                    backgroundColor: buildGradients(vals)
                }]
            }
        };

        var options = { legend: { display: !isBar} },
        axes = {
            show: [{ display: true, ticks: { beginAtZero: true, min: 0 } }],
            hide: [{ display: false}]
        };
        if (isBar) {
            options['scales'] = settings.type === 'bar' 
                ? { yAxes: axes.show, xAxes: axes.hide} 
                : { yAxes: axes.hide, xAxes: axes.show }
        }

        new Chart($(this)[0].getContext("2d"), { type: settings.type, data: mapData(settings.data), options });
        
        return this;
    }
}(jQuery));