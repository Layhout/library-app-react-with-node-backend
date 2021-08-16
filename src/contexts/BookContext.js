import axios from "axios";
import { createContext, useEffect, useReducer } from "react"
import { bookReducer } from "../reducers/bookReducer";

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
    const [books, bookDispatch] = useReducer(bookReducer, []);

    useEffect(() => {
        axios.get("http://localhost:1000/books").then(res => {
            bookDispatch({ type: "LOAD_BOOK", data: res.data });
        }).catch(err => bookDispatch({ type: "LOAD_BOOK", data: { error: err.message } }));
    }, []);

    return (
        <BookContext.Provider value={{ books, bookDispatch }}>
            {children}
        </BookContext.Provider>
    )
}

export default BookContextProvider
