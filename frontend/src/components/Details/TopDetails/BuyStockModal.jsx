import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';


export default function BuyStockModal({ element }) {

    const [buyList, setBuyList] = useState([]); // For setting bought tickers and their amount

    const [isOpen, setIsOpen] = useState(false); // For opening and closing modal
    const [quantity, setQuantity] = useState(0);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

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

    // for handle buy
    function handleBuy() {
        console.log("Bought ticker : " + element.ticker + " " + quantity);
        let found = buyList.find(e => e.ticker == element.ticker);
        let newTickers = buyList.filter(e => e.ticker !== element.ticker);
        let tempQuantity = found === undefined ? Number(quantity) : Number(found.quantity) + Number(quantity);
        let temp = {
            ticker: element.ticker,
            name: element.name,
            quantity: tempQuantity,
            avgCost: element.avgCost,
            totalCost: element.currPrice * tempQuantity,
            change: element.change,
            currPrice: element.currPrice,
            marketValue: element.currPrice * tempQuantity
        };
        setBuyList([temp, ...newTickers]);
        toggleModal();
    }

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary m-3" onClick={toggleModal}>
                Buy
            </button>

            {/* <!-- Modal --> */}
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className="mymodal p-2 text-center"
                overlayClassName="myoverlay"
                closeTimeoutMS={500}
            >
                <div className="d-flex justify-content-between">
                    <h5 className="">{element.name}</h5>
                    <button className="btn ms-auto" onClick={toggleModal}><FaRegWindowClose /></button>
                </div>
                <p className="">Current Price: {element.currPrice}</p>
                <div className="d-flex justify-content-between p-3">
                    <p className="">Quantity:</p><input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                </div>
                <div className="d-flex justify-content-center p-3">
                    <p className="">Total:</p><p>{quantity * element.currPrice}</p>
                    <button type="button" className="btn btn-primary ms-auto m-3" onClick={handleBuy}>Buy</button>
                </div>
            </Modal >
        </>
    )
}
