import BookCard from "../components/BookCard"
import "./BooksList.css"
import Masonry from "react-masonry-css"
import Backdrop from "../components/Backdrop"
import PopupForm from "../components/PopupForm"
import { useState, useEffect } from "react"

const BookList = () => {
    const [btnNewBook, setBtnNewBook] = useState(false)
    const [allBooks, setAllBooks] = useState([])

    const books = [
        {
            title: "JoJo's Bizarre Adventure",
            img: "https://i.pinimg.com/originals/4a/de/69/4ade697d6c1476320f645a0ba38f9ecd.jpg",
            author: "Hirohiko Araki",
            publisher: "Viz Media",
            genres: ["Adventure", "Fantasy", "Supernatural"],
        },
        {
            title: "Chainsaw man",
            img: "https://kbimages1-a.akamaihd.net/9b90e481-4b79-47e1-a919-3d0a46752177/1200/1200/False/chainsaw-man-vol-1.jpg",
            author: "Tatsuki Fujimoto",
            publisher: "Shueisha",
            genres: ["Action Fiction", "Comedy horror", "Dark fantasy"],
        },
        {
            title: "One Piece",
            img: "https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg",
            author: "Eiichiro Oda",
            publisher: "Viz Media",
            genres: ["Adventure Fiction", "Fantasy"],
        },
        {
            title: "One Punch Man",
            img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/OnePunchMan_manga_cover.png/220px-OnePunchMan_manga_cover.png",
            author: "ONE",
            publisher: "Viz Media",
            genres: ["Action", "Gag comedy", "Superhero"],
        },
        {
            title: "Demon Slayer: Kimetsu no Yaiba",
            img: "https://upload.wikimedia.org/wikipedia/en/0/09/Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg",
            author: "Koyoharu Gotouge",
            publisher: "Viz Media",
            genres: ["Adventure fiction", "Dark fantasy", "Martial Arts"],
        },
    ]

    useEffect(() => {
        setAllBooks(books.sort((a, b) => (a["title"] < b["title"]) ? -1 : 1));
    }, [])

    const sortBook = (by) => {
        console.log(by, typeof (by));
        setAllBooks(books.sort((a, b) => (a[by] < b[by]) ? -1 : 1));
        console.log(allBooks);
    }

    const searchBook = (term) => {
        setAllBooks(books.filter((book) => {
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
                    <button onClick={() => setBtnNewBook(true)}>ADD NEW BOOK</button>
                </div>
            </section>
            <section>
                <Masonry breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column" >
                    {allBooks.map((book, k) => (
                        <div key={k}>
                            <BookCard title={book.title} img={book.img} author={book.author} publisher={book.publisher} genres={book.genres} />
                        </div>
                    ))}
                </Masonry>
            </section>
            {btnNewBook && <><Backdrop closeForm={setBtnNewBook} /><PopupForm closeForm={setBtnNewBook} addBook={setAllBooks} /></>}
        </main>
    )
}

export default BookList
