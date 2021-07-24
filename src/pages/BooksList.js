import BookCard from "../components/BookCard"
import "./BooksList.css"
import Masonry from "react-masonry-css"
import Popup from "../components/Popup"
import { useState, useEffect } from "react"
import axios from "axios"

const BookList = () => {
    const [btnAddBook, setBtnAddBook] = useState(false);
    const [booksState, setBooksState] = useState([]);

    useEffect(async () => {
        const res = await axios.get("http://localhost:1000/books");
        setBooksState(res.data.sort((a, b) => (a["title"] < b["title"]) ? -1 : 1));
    }, [])

    const sortBook = async (by) => {
        const res = await axios.get("http://localhost:1000/books");
        if (by === "copise") {
            setBooksState(res.data.sort((a, b) => (a[by] < b[by]) ? 1 : -1));
        } else {
            setBooksState(res.data.sort((a, b) => (a[by] < b[by]) ? -1 : 1));
        }
    }

    const searchBook = (term) => {
        setBooksState(prev => prev.filter((book) => {
            const tTitle = book.title.toLowerCase();
            return tTitle.includes(term.toLowerCase());
        }))
    }

    const breakpoints = {
        default: 5,
        1100: 3,
        700: 2,
    }

    return (
        <main className="booksList">
            <section className="booksList-actions">
                <div className="booksList-actionsLeft">
                    <label htmlFor="sort">Sort By</label>
                    <select name="sort" id="sort" onChange={(e) => sortBook(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="copise">Copise</option>
                    </select>
                </div>
                <div className="booksList-actionsMid">
                    <div className="search-book">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "25px", color: "#3DA5D9" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" onChange={(e) => searchBook(e.target.value)} />
                    </div>
                </div>
                <div className="booksList-actionsRight">
                    <button onClick={() => setBtnAddBook(true)}>ADD NEW BOOK</button>
                </div>
            </section>
            <section>
                <Masonry breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column" >
                    {booksState.map((book) => (
                        <div key={book.id}>
                            <BookCard book={book} />
                        </div>
                    ))}
                </Masonry>
            </section>
            {btnAddBook && <Popup type="newBook" closeForm={setBtnAddBook} addBook={setBooksState} />}
        </main>
    )
}

export default BookList
