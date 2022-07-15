import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/Details.css'
import BottomDetails from '../components/Details/BottomDetails'
import TopDetails from '../components/Details/TopDetails'
import MiddleDetails from '../components/Details/MiddleDetails'
import Spinner from '../components/Spinner'
import { stockContext } from '../Contexts/stockContext'
import * as util from '../utils/util';

export default function Details () {
  let params = useParams()
  let ticker = params.ticker
  const [metaData, setMetaData] = useState({})
  const [latestPrice, setLatestPrice] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [newsData, setNewsData] = useState({})
  const [histData, setHistData] = useState({})
  const [onWatchList, setOnWatchList] = useState(false) // For watchlist button

  const startDateHist = util.formatDatePast2Year(new Date());
  
  // Get call function
  useEffect(() => {
    const getCall = async choice => {
      let options = {
        method: 'GET',
        url: `http://localhost:5000/${choice}/${ticker}`,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      await axios(options)
        .catch(function (error) {
          console.log(`Error received:${error}`)
        })
        .then(function (res) {
          choice === 'metadata'
            ? setMetaData(res.data)
            : choice === 'news'?setNewsData(res.data):setLatestPrice(res.data)
          setLoading(false)

          // choice === 'latestprice' && console.log(((((new Date()).getTime() - Date.parse(latestPrice.timestamp)) / 1000) < 60))
        })
    }
    // Getting metaData and latest price from the backend which makes API calls
    getCall('metadata')
    getCall('latestprice')
    getCall('news')

    const getHistData = async () => {
      let options = {
        method: 'GET',
        url: `http://localhost:5000/historical/${ticker}/date/${startDateHist}`,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      await axios(options)
        .catch(function (error) {
          console.log(`Error received:${error}`)
        })
        .then(function (res) {
          setHistData(res.data)
          setLoading(false)
        })
    }
    // Getting historical charts data from the backend which makes API calls
    getHistData();

  }, [ticker])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='mx-auto w-75'>
      <stockContext.Provider value={{ metaData, latestPrice, newsData, histData }}>
        {/* Top component */}
        <TopDetails metaData={metaData} latestPrice={latestPrice} onWatchList={onWatchList} setOnWatchList = {setOnWatchList}/>

        {/* Middle component */}
        <MiddleDetails latestPrice={latestPrice} />

        {/* Bottom component */}
        <BottomDetails />
      </stockContext.Provider>
    </div>
  )
}
