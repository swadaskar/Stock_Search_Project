import { useEffect, useState } from "react";
import { FaRegWindowClose } from 'react-icons/fa';
import GreenArrow from './../img/GreenArrowUp.jpg';
import RedArrow from './../img/RedArrowDown.jpg';

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);

  // Sample
  localStorage.setItem('tickers', JSON.stringify([{
    ticker: "AAPL", price: 100, name: "Apple Inc.",
    price: 542.9, change: -0.9, percentChange: -0.9
  }, {
    ticker: "MSFT", price: 100, name: "Microsoft",
      price: 50, change: 10, percentChange: 0.7
    }, {
      ticker: "AMZN", price: 100, name: "Amazon Inc.",
      price: 100.1, change: 1.0, percentChange: 1.0
    }]));

  // On render get tickers on watchlist from local storage and set them on watchlist
  useEffect(() => {
    const tickers = JSON.parse(localStorage.getItem('tickers'));
    if (tickers) {
      setWatchList(tickers);
    }
  }, []);

  // Whenever watchlist changes, update local storage
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('tickers', JSON.stringify(watchList));
    }, 500)
  }, [watchList]);

  function handleClose(ticker) {
    console.log("Deleted ticker : " + ticker);
    let newTickers = watchList.filter((Ticker) => Ticker.ticker !== ticker);
    setWatchList([...newTickers]);
  }

  if (watchList.length === 0) {
    return (
      <div className='mx-auto w-75'>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>My Watchlist</h1>
              <p>You have no tickers in your watchlist</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='mx-auto w-75'>
      <h1 className='text-center mb-3'>My Watchlist</h1>
      {watchList.map((ticker, index) => {
        return (<div className="card m-3" key={index}>
          <button className="btn ms-auto" onClick={() => handleClose(ticker.ticker)}><FaRegWindowClose /></button>
          <div className='d-flex justify-content-between'>
            <div className='p-2 bd-highlight'>
              <h2>{ticker.ticker}</h2>
              <p>{ticker.name}</p>
            </div>
            <div className='p-2 bd-highlight text-right' style={{ color: ticker.change > 0 ? "green" : "red" }}>
              <h2>{ticker.price}</h2>
              <p><img src={ticker.change > 0 ? GreenArrow : RedArrow} style={{ width: "20px", height: "15px" }} alt='Arrow image' />{ticker.change} ({ticker.percentChange})%</p>
            </div>
          </div>
        </div>)
      })}
    </div>
  )
}
