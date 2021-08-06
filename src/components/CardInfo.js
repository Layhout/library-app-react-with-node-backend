import "./CardInfo.css";
import formatedToday from "./formatedToday";
import axios from "axios";
import { useEffect, useState } from "react";

const CardInfo = ({ card, updCardState, i }) => {
    const [btnReturn, setBtnReturn] = useState(true);

    useEffect(() => {
        if (card.rDate) {
            setBtnReturn(false);
        } else {
            setBtnReturn(true);
        }
    }, [card.rDate])

    const handleClick = async (id) => {
        const res = await axios.patch(`http://localhost:1000/cards/${id}`, { rDate: formatedToday() });
        const res1 = await axios.get(`http://localhost:1000/books/${card.bookId}`);
        await axios.patch(`http://localhost:1000/books/${card.bookId}`, { copies: ++res1.data.copies });
        updCardState(i, res.data);
        setBtnReturn(false);
    }

    return (
        <li className="cardInfo">
            <div className="list-info">
                {card.id}
            </div>
            <div className="list-info">
                {card.visitor}
            </div>
            <div className="list-info">
                {card.book}
            </div>
            <div className="list-info">
                {card.bDate}
            </div>
            <div className={btnReturn ? "list-action" : "list-info"} style={{ border: "0" }}>
                {btnReturn ? <div>
                    <div className="icon" onClick={() => handleClick(card.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "25px" }} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div> : <span>{card.rDate}</span>}
            </div>
        </li>
    )
}

export default CardInfo
