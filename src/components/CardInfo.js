import "./styles/CardInfo.css";
import formatedToday from "./formatedToday";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CardInfo = ({ card }) => {
    const [btnReturn, setBtnReturn] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (card.rDate) {
            setBtnReturn(false);
        } else {
            setBtnReturn(true);
        }
    }, [card.rDate])

    const handleClick = async () => {
        try {
            await axios.patch("http://localhost:1000/books/return", { id: card.bookId });
            const res = await axios.patch("http://localhost:1000/cards/return", { id: card._id, rDate: formatedToday() });
            dispatch({ type: "UPDATE_ONE_CARD", data: res.data });
            setBtnReturn(false);
        } catch (err) {
            alert(err.response.data.error);
        }
    }

    return (
        <li className="cardInfo">
            <div className="list-info">
                {card._id.substr(-6)}
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
                    <div className="icon" onClick={handleClick}>
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
