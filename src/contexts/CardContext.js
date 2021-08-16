import axios from "axios";
import { createContext, useEffect, useReducer } from "react"
import { cardReducer } from "../redux/reducers/cardReducer";

export const CardContext = createContext();

const CardContextProvider = ({ children }) => {
    const [cards, cardDispatch] = useReducer(cardReducer, [])

    useEffect(() => {
        axios.get("http://localhost:1000/cards").then((res) => {
            cardDispatch({ type: "LOAD_CARD", data: res.data })
        }).catch((err) => cardDispatch({ type: "LOAD_CARD", data: { error: err.message } }));
    }, [])

    return (
        <CardContext.Provider value={{ cards, cardDispatch }}>
            {children}
        </CardContext.Provider>
    )
}

export default CardContextProvider
