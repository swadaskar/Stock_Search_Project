import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
// import { stockContext } from "./../../../../Contexts/stockContext";
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Spinner from "./../../../Spinner";
import axios from 'axios'

export default function DailyChart() {
  let params = useParams()
  let ticker = params.ticker
  const [isLoading, setLoading] = useState(true)
  const [dailyData, setDailyData] = useState({
    daily_data: [],
  })

  useEffect(() => {
    const getDailyData = async () => {
      let options = {
        method: 'GET',
        url: `http://localhost:5000/daily/${ticker}`,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      await axios(options)
        .catch(function (error) {
          console.log(`Error received:${error}`)
        })
        .then(function (res) {
          setDailyData(res.data)
          setLoading(false)
        })
    }
    // Getting daily charts data from the backend which makes API calls
    getDailyData();
  }, [])

  const writeCharts = (response) => {
    if (response['daily_data'].length === 0) {
      console.log('Empty charts JSON, no such stock');
      return null;
    } else {
      let dailyData = response['daily_data'] // [[date, close, volume], [date, close, volume], ....]
      let tickerName = response['ticker_name']
      let currentDate = response['current_date']

      // split the data set into close and volume
      let volume = [],
        close = [],
        dataLength = dailyData.length
      let i
      console.log('Daily Data record number: ' + dataLength)

      for (i = 0; i < dataLength; i += 1) {
        close.push([
          dailyData[i][0], // the date
          dailyData[i][1] // close
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
            
            // offset: 1  // move Volume yAxis out of plot area, need to be dismissed with label align left
          },
          {
            title: { text: 'Stock Price' },
            opposite: false,
            min: close[0][1]-5,
          }
        ],

        plotOptions: {
          column: {
            pointWidth: 2,
            color: '#404040'
          }
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
          }
        ]
      }
      return options;
    }
  }

  // Get data from backend (from the Details.jsx file) and feed into the function to create the chart below
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={writeCharts(dailyData)}
      />
    </div>
  )
}
