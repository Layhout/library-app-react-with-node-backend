import { useContext, useEffect, useState } from "react";
import ActionsBar from "../components/ActionsBar";
import "./styles/CardsList.css";
import CardInfo from "../components/CardInfo";
import Popup from "../components/Popup";
import { CardContext } from "../contexts/CardContext";

const CardsList = () => {
    const { cards } = useContext(CardContext);
    const [cardState, setCardState] = useState([]);
    const [btnAddCard, setBtnAddCard] = useState(false);

    useEffect(() => {
        setCardState(cards);
    }, [cards])

    const sortCard = (by) => {
        setCardState(cards.slice().sort((a, b) => (a[by].toLowerCase() < b[by].toLowerCase()) ? -1 : 1));
    }

    const searchCard = (term) => {
        setCardState(cards.filter(c =>
            c.visitor.includes(term.toLowerCase()) || c.book.includes(term.toLowerCase())
        ));
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
