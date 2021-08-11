import { useEffect, useState } from "react";
import ActionsBar from "../components/ActionsBar";
import axios from "axios";
import "./CardsList.css";
import CardInfo from "../components/CardInfo";
import Popup from "../components/Popup";

const CardsList = () => {
    const [btnAddCard, setBtnAddCard] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cardState, setCardState] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [dataIsHere, setDataIsHere] = useState(false)

    const fetchCard = async () => {
        try {
            const res = await axios.get("http://localhost:1000/cards");
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        fetchCard().then((data) => {
            setCardState(data);
            setIsLoading(false);
            setDataIsHere(true);
        }).catch((err) => {
            setIsLoading(false);
            setIsError(true);
            setErrMsg("Server failure: " + err.message);
        })
    }, [])

    const updCardState = (i, newCard) => {
        const newCardState = [...cardState];
        newCardState[i] = newCard;
        setCardState(newCardState);
    }

    const sortCard = async (by) => {
        const allCard = await fetchCard();
        setCardState(allCard.sort((a, b) => (a[by] < b[by]) ? -1 : 1));
    }

    return (
        <main className="cardsList">
            <section>
                <ActionsBar sortOp={["ID", "visitor", "book"]} searchBy="search by visitor's name" btnName="new card" setBtnAdd={setBtnAddCard} sort={sortCard} />
            </section>
            {isLoading && <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2>}
            {isError && <h2 style={{ textAlign: "center", marginTop: "30px" }}>{errMsg}</h2>}
            {dataIsHere && <section className="list">
                <div className="list-header">
                    <h1>ID</h1>
                    <h1>Visitor</h1>
                    <h1>Book</h1>
                    <h1>Borrow Date</h1>
                    <h1>Return Date</h1>
                </div>
                <div className="list-body">
                    <ul>
                        {cardState.map((cs, k) => (
                            <CardInfo key={k} card={cs} i={k} updCardState={updCardState} />
                        ))}
                    </ul>
                </div>
            </section>}
            {btnAddCard && <Popup closePopup={setBtnAddCard} type="newCard" addCard={setCardState} />}
        </main>
    )
}

export default CardsList
