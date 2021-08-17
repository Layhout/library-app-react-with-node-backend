import { useEffect, useState } from "react";
import ActionsBar from "../components/ActionsBar";
import "./styles/CardsList.css";
import CardInfo from "../components/CardInfo";
import Popup from "../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CardsList = () => {
    const [cardState, setCardState] = useState([]);
    const [btnAddCard, setBtnAddCard] = useState(false);
    const cards = useSelector(state => state.cards);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:1000/cards").then((res) => {
            dispatch({ type: "LOAD_CARD", data: res.data })
        }).catch((err) => dispatch({ type: "LOAD_CARD", data: { error: err.message } }));
    }, [dispatch]);

    useEffect(() => {
        setCardState(cards);
    }, [cards]);

    const sortCard = (by) => {
        if (by === "ID") {
            setCardState(cards.slice().sort((a, b) => (a._id - b._id)));
        } else {
            setCardState(cards.slice().sort((a, b) => (a[by].toLowerCase() < b[by].toLowerCase()) ? -1 : 1));
        }
    }

    const searchCard = (term) => {
        const matchedcards = cards.filter((c) => c.visitor.toLowerCase().includes(term.toLowerCase()));
        if (matchedcards.length !== 0) {
            setCardState(matchedcards);
        } else {
            setCardState({ error: `No visitor named: "${term}"` });
        }
    }

    return (
        <main className="cardsList">
            <section>
                <ActionsBar sortOp={["ID", "visitor", "book"]} searchBy="search by visitor's name" btnName="new card" setBtnAdd={setBtnAddCard} sort={sortCard} search={searchCard} />
            </section>
            {cardState.error ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>{cardState.error}</h2> :
                cardState.length ? <section className="list">
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
                                <CardInfo key={k} card={cs} />
                            ))}
                        </ul>
                    </div>
                </section> : <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2>
            }
            {btnAddCard && <Popup closePopup={setBtnAddCard} type="newCard" />}
        </main>
    )
}

export default CardsList
