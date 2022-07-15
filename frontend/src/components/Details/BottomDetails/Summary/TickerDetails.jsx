import { useContext } from "react";
import { stockContext } from '../../../../Contexts/stockContext'

export default function TickerDetails() {
  const { latestPrice } = useContext(stockContext)
  const status = (((new Date()).getTime() - Date.parse(latestPrice.timestamp)) / 1000) > 60 ? false : true
  // const status = true
  return (
    <>
      <div class="d-flex bd-highlight">
        <div class="p-2 flex-fill bd-highlight">
          <table>
            <tbody>
              <tr>
                <td>High Price:</td>
                <td>{latestPrice.high}</td>
              </tr>
              <tr>
                <td>Low Price:</td>
                <td>{latestPrice.low}</td>
              </tr>
              <tr>
                <td>Open Price:</td>
                <td>{latestPrice.open}</td>
              </tr>
              <tr>
                <td>Price Close:</td>
                <td>{latestPrice.prevClose}</td>
              </tr>
              <tr>
                <td>Volume:</td>
                <td>{latestPrice.volume}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {status && <div class="p-2 flex-fill bd-highlight">
          <table>
            <tbody>
              <tr>
                <td>Mid Price:</td>
                <td>{latestPrice.mid == null ? '-' : latestPrice.mid}</td>
              </tr>
              <tr>
                <td>Ask Price:</td>
                <td>{latestPrice.askPrice}</td>
              </tr>
              <tr>
                <td>Ask Size:</td>
                <td>{latestPrice.askSize}</td>
              </tr>
              <tr>
                <td>Bid Price:</td>
                <td>{latestPrice.bidPrice}</td>
              </tr>
              <tr>
                <td>Bid Size:</td>
                <td>{latestPrice.bidSize}</td>
              </tr>
            </tbody>
          </table>
        </div>}
      </div>
    </>
  )
}
