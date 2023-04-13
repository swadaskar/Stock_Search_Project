const axios = require('axios')
require("dotenv").config({ path: __dirname + "/../.env" });
const util = require('./utils/util');

const tiingoAPIkey = process.env.TIINGO_API_KEY

const newsAPIkey = process.env.NEWS_API_KEY

module.exports.getAutocomplete = getAutocomplete
module.exports.getCompanyMetaData = getCompanyMetaData
module.exports.getLatestPrice = getLatestPrice
module.exports.getNewsData = getNewsData
module.exports.getHistoricalData = getHistoricalData
module.exports.getDailyChartData = getDailyChartData

async function getAutocomplete (keyword) {
  let options = {
    method: 'GET',
    url: `https://api.tiingo.com/tiingo/utilities/search`,
    params: { token: tiingoAPIkey, query: keyword },
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let response = await axios(options).catch(function (error) {
    console.log(`Error received:${error}`)
  })
  console.log(response.data)
  return response.data
}

async function getCompanyMetaData (tickerName) {
  let options = {
    method: 'GET',
    url: `https://api.tiingo.com/tiingo/daily/${tickerName}`,
    params: { token: tiingoAPIkey },
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let response = await axios(options).catch(function (error) {
    console.log(`Error received:${error}`)
  })
  console.log(response.data)
  return response.data
}

async function getLatestPrice (tickerName) {

  let options = {
    method: 'GET',
    url: `https://api.tiingo.com/iex`,
    params: { token: tiingoAPIkey, tickers: tickerName },
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let response = await axios(options).catch(function (error) {
    console.log(`Error received:${error}`)
  })
  console.log(response.data)
  if (response.data.length === 0) {
    return { detail: 'Not found.' }
  } else {
    return response.data[0]
  }
}

async function getNewsData (tickerName) {
  let options = {
    method: 'GET',
    url: `https://newsapi.org/v2/everything`,
    params: { apiKey: newsAPIkey, q: tickerName },
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let response = await axios(options).catch(function (error) {
    console.log(`Error received:${error}`)
  })
  console.log(response.data)
  return response.data
}

async function getDailyChartData(tickerName, startDate) {
  let options = {
    method: 'GET',
    url: `https://api.tiingo.com/iex/${tickerName}/prices?columns=open,high,low,close,volume&startDate=${startDate}&resampleFreq=4min&token=${tiingoAPIkey}`,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let response = await axios(options).catch(function (error) {
    console.log(`Error received:${error}`)
  }
  )
  console.log(response.data)
  return response.data;
}

async function getHistoricalData (tickerName, startDate) {
  let options = {
    method: 'GET',
    url: `https://api.tiingo.com/iex/${tickerName}/prices?columns=open,high,low,close,volume&startDate=${startDate}&resampleFreq=12hour&token=${tiingoAPIkey}`,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let response = await axios(options).catch(function (error) {
    console.log(`Error received:${error}`)
  }
  )
  console.log(response.data)
  return response.data;
}