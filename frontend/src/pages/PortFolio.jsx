import { useEffect, useState } from "react";
import { FaRegWindowClose } from 'react-icons/fa';
import GreenArrow from './../img/GreenArrowUp.jpg';
import RedArrow from './../img/RedArrowDown.jpg';
import Spinner from './../components/Spinner';
import axios from "axios";
import SellStockModal from "./../components/Details/TopDetails/SellStockModal";
import BuyStockModal from "./../components/Details/TopDetails/BuyStockModal";

export default function PortFolio() {
  const [buyList, setBuyList] = useState([]); // For setting bought tickers and their amount
  const [isLoading, setLoading] = useState(true)

  // Get call function
  useEffect(() => {
    const getCall = async ticker => {
      let options = {
        method: 'GET',
        url: `http://localhost:5000/latestprice/${ticker}`,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      await axios(options)
        .catch(function (error) {
          console.log(`Error received:${error}`)
        })
        .then(function (res) {
          let found = buyList.find(element => element.ticker === ticker);
          let newTickers = buyList.filter((element) => element.ticker !== ticker);
          let temp = {
            ticker: found.ticker,
            name: found.name,
            quantity: found.quantity,
            avgCost: found.avgCost,
            totalCost: found.totalCost,
            change: res.data.last - res.data.prevClose,
            currPrice: res.data.last,
            marketValue: res.data.last * found.quantity
          };
          setBuyList([temp, ...newTickers])
          setLoading(false)
        })
    }
    // Getting latest price from the backend which makes API calls
    for (var i = 0; i < buyList.length; i++) {
      getCall(buyList[i].ticker);
    }
    if (buyList.length === 0) {
      setLoading(false)
    }
  }, [])

  // On render get tickers on buylist from local storage and set them on buylist
  useEffect(() => {
    const tickers = JSON.parse(localStorage.getItem('buylist'));
    if (tickers) {
      setBuyList(tickers);
    }
  }, []);

  // Whenever buylist changes, update local storage
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('buylist', JSON.stringify(buyList));
    }, 500)
  }, [buyList]);

  if (isLoading) {
    return <Spinner />
  } else if (buyList.length === 0) {
    return (
      <div className='mx-auto w-75'>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>My Portfolio</h1>
              <p>You have no tickers in your portfolio</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='mx-auto w-75'>
      <h1 className='text-center mb-3'>My Portfolio</h1>
      {buyList.map((element, index) => {
        return (<div key={index} className="card m-3">
          <div className='d-flex flex-column'>
            <div className='p-2 bd-highlight bg-light'>
              <h2>{element.ticker}<small className="text-muted">  {element.name}</small></h2>
            </div>
            <div className='p-2 bd-highlight border border-secondary'>
              <div class="d-flex bd-highlight">
                <div class="p-2 flex-fill bd-highlight">
                  <table>
                    <tbody>
                      <tr>
                        <td>Quantity:</td>
                        <td>{element.quantity}</td>
                      </tr>
                      <tr>
                        <td>Avg Cost / Share:</td>
                        <td>{element.avgCost}</td>
                      </tr>
                      <tr>
                        <td>Total Cost:</td>
                        <td>{element.totalCost}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="p-2 flex-fill bd-highlight">
                  <table>
                    <tbody style={{ color: element.change > 0 ? "green" : "red" }}>
                      <tr>
                        <td><img src={element.change > 0 ? GreenArrow : RedArrow} style={{ width: "20px", height: "15px" }} alt='Arrow image' />Change:</td>
                        <td>{element.change}</td>
                      </tr>
                      <tr>
                        <td>Current Price:</td>
                        <td>{element.currPrice}</td>
                      </tr>
                      <tr>
                        <td>Market Value:</td>
                        <td>{element.marketValue}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='p-2 bd-highlight bg-light '>
              <BuyStockModal element={element} />
              <SellStockModal element={element} />
            </div>
          </div>
        </div>);
      }
      )}
    </div>
  )
}
