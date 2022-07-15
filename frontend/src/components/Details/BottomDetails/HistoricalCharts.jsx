import { useContext } from "react"
import { stockContext } from "../../../Contexts/stockContext"
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

export default function HistoricalCharts() {
  const { histData } = useContext(stockContext)

  function writeCharts(response) {
    if (response['hist_data'].length === 0) {
      console.log('Empty charts JSON, no such stock');
      return;
    } else {
      // showCharts('off')
      let histData = response['hist_data'] // [[date, close, volume], [date, close, volume], ....]
      let tickerName = response['ticker_name']
      let currentDate = response['current_date']

      // split the data set into close and volume
      let volume = [],
        close = [],
        dataLength = histData.length
      let i
      console.log('Historical record number: ' + dataLength)

      for (i = 0; i < dataLength; i += 1) {
        close.push([
          histData[i][0], // the date
          histData[i][1] // close
        ])

        volume.push([
          histData[i][0], // the date
          histData[i][2] // the volume
        ])
      }

      const options = {
        stockTools: {
          gui: {
            enabled: false // disable the built-in toolbar
          }
        },

        xAxis: {
          type: 'datetime',
          labels: {
            format: '{value:%e. %b}'
          }
        },

        yAxis: [
          {
            title: { text: 'Volume' },
            labels: { align: 'left' }, // align text of label from left side
            min: 0
            // offset: 1  // move Volume yAxis out of plot area, need to be dismissed with label align left
          },
          {
            title: { text: 'Stock Price' },
            opposite: false,
            min: 0
          }
        ],

        plotOptions: {
          column: {
            pointWidth: 2,
            color: '#404040'
          }
        },

        rangeSelector: {
          buttons: [
            {
              type: 'day',
              count: 7,
              text: '7d'
            },
            {
              type: 'day',
              count: 15,
              text: '15d'
            },
            {
              type: 'month',
              count: 1,
              text: '1m'
            },
            {
              type: 'month',
              count: 3,
              text: '3m'
            },
            {
              type: 'month',
              count: 6,
              text: '6m'
            }
          ],
          selected: 4,
          inputEnabled: false
        },

        title: { text: 'Stock Price ' + tickerName + ' from ' + currentDate },

        subtitle: {
          text:
            '<a href="https://api.tiingo.com/" target="_blank">Source: Tiingo</a>',
          useHTML: true
        },

        series: [
          {
            type: 'area',
            name: tickerName,
            data: close,
            yAxis: 1,
            showInNavigator: true,
            // gapSize: 5,
            tooltip: {
              valueDecimals: 2
            },
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [
                  1,
                  Highcharts.color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get('rgba')
                ]
              ]
            }
          },
          {
            type: 'column',
            name: tickerName + ' Volume',
            data: volume,
            yAxis: 0,
            showInNavigator: false
          }
        ]
      }
      return options;
    }
  }

  // Get data from backend (from the Details.jsx file) and feed into the function to create the chart below

  return (
    <>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={writeCharts(histData)}
        />
      </div>
    </>
  )
}
