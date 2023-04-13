const express = require('express');
const cors = require('cors');
require("dotenv").config({ path: __dirname + "/../.env" });
const outerAPI = require('./API_functions');
const app = express();
const sample = require('./sampleData');
const util = require('./utils/util');

app.use(cors());

app.get("/", async function (req, res) {
  res.json("Hello World!");
});


app.get("/searchutil/:keyword", async function (req, res) {
  console.log(`\nSearch-utilities Call: ${req.params.keyword}`);
  let origRes = await outerAPI.getAutocomplete(req.params.keyword);
  if (origRes){
    res.status(200).json(origRes);
  }
  // res.send(sample.sampleData);

});

app.get("/metadata/:tickerName", async function (req, res) {
  console.log(`\nMeta Data Call: ${req.params.tickerName.toUpperCase()}`);
  let origRes = await outerAPI.getCompanyMetaData(req.params.tickerName);
  console.log(
    `${req.params.tickerName.toUpperCase()} Meta Data finished at ${Date()}\n`
  );
  if (origRes)
      return res.status(200).json(origRes);

  // res.send(sample.metaData);
});

app.get("/latestprice/:tickerName", async function (req, res) {
  console.log(`\nLatest Price Call: ${req.params.tickerName.toUpperCase()}`);
  let origRes = await outerAPI.getLatestPrice(req.params.tickerName);
  console.log(
    `${req.params.tickerName.toUpperCase()} Latest Price finished at ${Date()}\n`
  );
  if (origRes)
      return res.status(200).json(origRes);

  // res.send(sample.latestPrice);
});

app.get("/news/:tickername", async function (req, res) {
  console.log(`\nNews Call: ${req.params.tickername.toUpperCase()}`);
  let origRes = await outerAPI.getNewsData(req.params.tickername);
  if (origRes)
    return res.status(200).json(origRes);

  // res.send(sample.newsData);
})

app.get("/historical/:tickerName/date/:startDate", async function (req, res) {
  console.log(
    `\nHistorical Data Call: ${req.params.tickerName.toUpperCase()}`
  );
  let origRes = await outerAPI.getHistoricalData(
    req.params.tickerName,
    req.params.startDate
  );
  console.log(
    `${req.params.tickerName.toUpperCase()} Historical Data finished at ${Date()}\n`
  );


  // let origRes = sample.histData;
  if (!origRes) {
    res.send({});
  }
  historical_data = []
  for (var record of origRes) {
    var tz_offset = 16 * 60 * 60 * 1000;
    date = Date.parse(record["date"]) - tz_offset // ms rather than second
    historical_data.push([date, record["close"], Number(record["volume"])])
  }
  const histData = {      
    hist_data: historical_data,
    ticker_name: req.params.tickerName,
    current_date: req.params.startDate
  }
  res.send(histData);
});

app.get("/daily/:tickerName", async function (req, res) {
  const startDate = util.formatDate(new Date());
  console.log(
    `\nDaily Chart Data Call: ${req.params.tickerName.toUpperCase()}`
  );
  let origRes = await outerAPI.getDailyChartData(
    req.params.tickerName,
    startDate
  );
  console.log(
    `${req.params.tickerName.toUpperCase()} Daily Chart Data finished at ${Date()}\n`
  );

  // let origRes = sample.dailyData;
  if (!origRes) {
    res.send({});
  }
  daily_chart_data = []
  for (var record of origRes) {
    var tz_offset = 16 * 60 * 60 * 1000;
    date = Date.parse(record["date"]) - tz_offset // ms rather than second
    daily_chart_data.push([date, record["close"], Number(record["volume"])])
  }
  const dailyData = {
    daily_data: daily_chart_data,
    ticker_name: req.params.tickerName,
    current_date: startDate
  }
  res.send(dailyData);
});


// Listen to env port or 3000 otherwise
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node Stock Server listening on port ${PORT}...`);
});