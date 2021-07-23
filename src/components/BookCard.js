import "./BookCard.css"
import Genre from "./Genre"

const BookCard = ({ title, img, author, publisher, genres }) => {
    return (
        <div className="bookCard">
            <img src={img} alt="" />
            <h1>{title}</h1>
            <span>by {author}</span>
            <span>published by {publisher}</span>
            <div className="book-genre">
                {genres.map((genre, k) => (
                    <Genre key={k} item={genre} />
                ))}
            </div>
        </div>
    )
}

export default BookCard
