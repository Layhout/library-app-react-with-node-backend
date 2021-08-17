import BookCard from "../components/BookCard"
import "./styles/BooksList.css"
import Masonry from "react-masonry-css"
import Popup from "../components/Popup"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ActionsBar from "../components/ActionsBar"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const BookList = () => {
    const books = useSelector(state => state.books);
    const dispatch = useDispatch();
    const [bookState, setBookState] = useState([]);
    const [btnAddBook, setBtnAddBook] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:1000/books").then((res) => {
            dispatch({ type: "LOAD_BOOK", data: res.data });
        }).catch((err) => {
            dispatch({ type: "LOAD_BOOK", data: { error: err.message } });
        });
    }, [dispatch])

    useEffect(() => {
        setBookState(books);
    }, [books])

    const sortBook = (by) => {
        if (by === "copies") {
            setBookState(books.slice().sort((a, b) => b[by] - a[by]));
        } else {
            setBookState(books.slice().sort((a, b) => (a[by].toLowerCase() < b[by].toLowerCase()) ? -1 : 1));
        }
    }

    const searchBook = (term) => {
        const matchedBook = books.filter((b) => b.title.toLowerCase().includes(term.toLowerCase()));
        if (matchedBook.length !== 0) {
            setBookState(matchedBook);
        } else {
            setBookState({ error: `No book titled: "${term}"` });
        }
    }

    const breakpoints = {
        default: 4,
        1100: 3,
        700: 2,
    }

    return (
        <main className="booksList">
            <section>
                <ActionsBar sort={sortBook} setBtnAdd={setBtnAddBook} search={searchBook} sortOp={["title", "author", "copies"]} searchBy="Search By Title" btnName="add new book" />
            </section>
            {bookState.error ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>{bookState.error}</h2> :
                <section>
                    {bookState.length ? <Masonry breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column" >
                        {bookState.map((book) => (
                            <Link key={book._id} to={`/books/${book._id}`}>
                                <div style={{ marginBottom: "15px" }}>
                                    <BookCard book={book} />
                                </div>
                            </Link>
                        ))}
                    </Masonry> : <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2>}
                </section>
            }
            {btnAddBook && <Popup type="newBook" closePopup={setBtnAddBook} />}
        </main>
    )
}

export default BookList
