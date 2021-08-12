import BookCard from "../components/BookCard"
import "./styles/BooksList.css"
import Masonry from "react-masonry-css"
import Popup from "../components/Popup"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import ActionsBar from "../components/ActionsBar"

const BookList = () => {
    const [btnAddBook, setBtnAddBook] = useState(false);
    const [booksState, setBooksState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("")

    const fetchBooks = async () => {
        try {
            const { data } = await axios.get("http://localhost:1000/books");
            return data;
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        fetchBooks().then((data) => {
            setBooksState(data);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            setIsError(true);
            setErrMsg("Server Failure: " + err.message);
        })
    }, []);

    const sortBook = async (by) => {
        const allBooks = await fetchBooks();
        if (by === "copies") {
            setBooksState(allBooks.sort((a, b) => b[by] - a[by]));
        } else {
            setBooksState(allBooks.sort((a, b) => (a[by] < b[by]) ? -1 : 1));
        }
    }

    const searchBook = async (term) => {
        const allBooks = await fetchBooks();
        setBooksState(allBooks.filter((book) => {
            return book.title.includes(term);
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
                <ActionsBar sort={sortBook} search={searchBook} setBtnAdd={setBtnAddBook} sortOp={["title", "author", "copies"]} searchBy="Search By Title" btnName="add new book" />
            </section>
            {isLoading && <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2>}
            {isError && <h2 style={{ textAlign: "center", marginTop: "30px" }}>{errMsg}</h2>}
            <section>
                <Masonry breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column" >
                    {booksState.map((book) => (
                        <Link key={book._id} to={`/books/${book._id}`}>
                            <div style={{ marginBottom: "15px" }}>
                                <BookCard book={book} />
                            </div>
                        </Link>
                    ))}
                </Masonry>
            </section>
            {btnAddBook && <Popup type="newBook" closePopup={setBtnAddBook} addBook={setBooksState} />}
        </main>
    )
}

export default BookList
