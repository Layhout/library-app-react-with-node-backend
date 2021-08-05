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

    useEffect(async () => {
        const res = await axios.get("http://localhost:1000/cards");
        setCardState(res.data);
        setIsLoading(false);
    }, [])

    return (
        <main className="cardsList">
            <section>
                <ActionsBar sortOp={["Borrow date", "return date"]} searchBy="search by visitor's name" btnName="new card" setBtnAdd={setBtnAddCard} />
            </section>
            <section className="list">
                <div className="list-header">
                    <h1>ID</h1>
                    <h1>Visitor</h1>
                    <h1>Book</h1>
                    <h1>Borrow Date</h1>
                    <h1>Return Date</h1>
                </div>
                <div className="list-body">
                    {isLoading ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2> :
                        <ul>
                            {cardState.map(cs => (
                                <CardInfo card={cs} />
                            ))}
                        </ul>
                    }
                </div>
            </section>
            {btnAddCard && <Popup closePopup={setBtnAddCard} type="newCard" addCard={setCardState} />}
        </main>
    )
}

export default CardsList
