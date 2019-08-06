function (data){
 
 //Condição para tratar valores nulos 
if (data.resultset.length !== 0) {  
    percentual = data.resultset[0][1];
    valor = "R$ "+data.resultset[0][0].toLocaleString('pt-BR');
}
else {
    percentual = 0;
    valor = 'Não há informações';
}

var gaugeOptions = {
    chart: {
        type: 'solidgauge',
        height: 180
    },
    title: null,
    pane: {
        center: ['50%', '85%'],
        size: '120%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },
    tooltip: {
        enabled: false
    },

    // Faixa de valores para alternar as cores do Gauge
    yAxis: {
        minColor: percentual <= 48.59 ? '#55BF3B' : (percentual < 51.29 ? '#DDDF0D' : (percentual < 53.99 ? '#FF7F00' : '#E50000')),
        maxColor: percentual <= 48.59 ? '#55BF3B' : (percentual < 51.29 ? '#DDDF0D' : (percentual < 53.99 ? '#FF7F00' : '#E50000')),
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

// Renderiza o Gauge
var chart = Highcharts.chart(this.htmlObject, Highcharts.merge(gaugeOptions, {
    yAxis: {
        /* ## Intervalo de valores do Gauge ## */
        min: 0,
        max: 100,
        title: {
        text: '<span style="font-size:18px;font-weight:bold;color:gray">'+valor+'</span></div>'
        }
    },
     title:{
        text: ''
    },
    credits: {
        enabled: false
    },

    series: [{
        name: '%',
        data: [percentual],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:22px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:,.2f}%</span><br/>' +
                   '<span style="font-size:12px;color:silver"> </span></div>'
        },
        tooltip: {
            valueSuffix: ' %'
        }
    }],
   
    exporting: {
      enabled: true,    
      buttons: {
        contextButton: {
            /*Other Options --> ## 'printChart','downloadPNG','downloadPDF','openInCloud','downloadCSV','downloadXLS' ## */
          menuItems: ['downloadJPEG','downloadSVG']
        }
      }
    }

}));

} 