import "./styles/BookCard.css"
import Genre from "./Genre"

const BookCard = ({ book }) => {
    return (
        <div className="bookCard">
            <img src={book.img} alt="" />
            <h1>{book.title}</h1>
            <span>by {book.author}</span>
            <span>published by {book.publisher}</span>
            <div className="book-genre">
                {book.genres.map((genre, k) => (
                    <Genre key={k} item={genre} />
                ))}
            </div>
        </div>
    )
}

export default BookCard
