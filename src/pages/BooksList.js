import BookCard from "../components/BookCard"
import "./BooksList.css"
import Masonry from "react-masonry-css"
import Popup from "../components/Popup"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import ActionsBar from "../components/ActionsBar"

const BookList = () => {
    const [btnAddBook, setBtnAddBook] = useState(false);
    const [booksState, setBooksState] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchBooks = async () => {
        const res = await axios.get("http://localhost:1000/books");
        return res.data;
    }

    useEffect(async () => {
        const allBooks = await fetchBooks();
        allBooks.sort((a, b) => (a["title"].toLowerCase() < b["title"].toLowerCase()) ? -1 : 1)
        setBooksState(allBooks);
        setIsLoading(false);
    }, []);

    const sortBook = async (by) => {
        const allBooks = await fetchBooks();
        if (by === "copise") {
            setBooksState(allBooks.sort((a, b) => b[by] - a[by]));
        } else {
            setBooksState(allBooks.sort((a, b) => (a[by].toLowerCase() < b[by].toLowerCase()) ? -1 : 1));
        }
    }

    const searchBook = async (term) => {
        const allBooks = await fetchBooks();
        allBooks.sort((a, b) => (a["title"] < b["title"]) ? -1 : 1);
        setBooksState(allBooks.filter((book) => {
            const tTitle = book.title.toLowerCase();
            return tTitle.includes(term.toLowerCase());
        }))
    }

    const breakpoints = {
        default: 4,
        1100: 3,
        700: 2,
    }

    return (
        <main className="booksList">
            <section>
                <ActionsBar sort={sortBook} search={searchBook} setBtnAdd={setBtnAddBook} sortOp={["title", "author", "copise"]} searchBy="Search By Title" btnName="add new book" />
            </section>
            {isLoading ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2> : <section>
                <Masonry breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column" >
                    {booksState.map((book) => (
                        <Link key={book.id} to={`/books/${book.id}`}>
                            <div style={{ marginBottom: "15px" }}>
                                <BookCard book={book} />
                            </div>
                        </Link>
                    ))}
                </Masonry>
            </section>}
            {btnAddBook && <Popup type="newBook" closePopup={setBtnAddBook} addBook={setBooksState} />}
        </main>
    )
}

export default BookList
