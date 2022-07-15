import GreenArrow from './../../img/GreenArrowUp.jpg';
import RedArrow from './../../img/RedArrowDown.jpg';
import {FaStar} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import BuyStockModal from './TopDetails/BuyStockModal';
import * as util from '../../utils/util';

export default function TopDetails({ metaData, latestPrice, onWatchList, setOnWatchList }) {
  
  const [watchList, setWatchList] = useState([]) // For setting tickers on watchlist

  const change = latestPrice.last - latestPrice.prevClose
  const percentChange = (change * 100 / latestPrice.prevClose).toFixed(2)

  const element = {
    ticker: metaData.ticker,
    name: metaData.name,
    quantity: 0,
    avgCost: latestPrice.last,
    totalCost: 0,
    change: latestPrice.last - latestPrice.prevClose,
    currPrice: latestPrice.last,
    marketValue: 0
  }

  // Add ticker on watchlist if Watchlist button is activated
  function handleWatchListClick(){
    if (onWatchList) {
      // const temp = JSON.parse(localStorage.getItem('tickers'));
      // temp.find((element) => element == metaData.ticker ? null : );
      setOnWatchList(false);
      let newTickers = watchList.filter((Ticker) => Ticker.ticker !== metaData.ticker);
      setWatchList([...newTickers]);
    } else if (!onWatchList) {
      setOnWatchList(true);
      let temp={
        ticker: metaData.ticker,
        price: latestPrice.last,
        change: change,
        percentChange: percentChange,
        name: metaData.name
      };
      setWatchList([temp, ...watchList])
      console.log("Added to watchlist");
    }
  }

  // Get tickers on watchlist from local storage and set them on watchlist on render
  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem('tickers'));
    temp.find((element) => element.ticker == metaData.ticker ? setOnWatchList(true) : null);
    if(temp){
      setWatchList(temp);
    }
  }, []);

 // Whenever watchlist changes, update local storage
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('tickers', JSON.stringify(watchList));
    }, 500)
  }, [watchList]);

  return (
    <>
      <div className='d-flex justify-content-between'>
        <div className='p-2 bd-highlight'>
          <h1>{metaData.ticker}<FaStar className='star' style={{ fill: onWatchList ? "yellow" : "black" }} onClick={handleWatchListClick}/></h1>

          <h2>{metaData.name}</h2>
          <h3>{metaData.exchangeCode}</h3>
          <BuyStockModal element={element}/>
        </div>
        <div className='p-2 bd-highlight text-right' style={{ color: change > 0 ? "green" : "red" }}>
          <h1>{latestPrice.last}</h1>
          <h2><img src={change > 0 ? GreenArrow : RedArrow} style={{ width: "20px", height: "15px" }} alt='Arrow image' />{change} ({percentChange})%</h2>
          <h3>{util.formatDateDetailed(new Date())}</h3>
        </div>
      </div></>
  )
}