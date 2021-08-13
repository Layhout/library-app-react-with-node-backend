import BookCard from "../components/BookCard"
import "./styles/BooksList.css"
import Masonry from "react-masonry-css"
import Popup from "../components/Popup"
import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import ActionsBar from "../components/ActionsBar"
import { BookContext } from "../contexts/BookContext"

const BookList = () => {
    const { books } = useContext(BookContext);
    const [bookState, setBookState] = useState([]);
    const [btnAddBook, setBtnAddBook] = useState(false);

    useEffect(() => {
        setBookState(books)
    }, [books])

    const sortBook = (by) => {
        if (by === "copies") {
            setBookState(books.slice().sort((a, b) => b[by] - a[by]));
        } else {
            setBookState(books.slice().sort((a, b) => (a[by] < b[by]) ? -1 : 1));
        }
    }

    const searchBook = (term) => {
        setBookState(books.filter((b) => b.title.includes(term.toLowerCase())))
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
