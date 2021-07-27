import { useEffect, useState } from "react"
import "./BookDetails.css"
import axios from "axios"
import { useParams } from "react-router-dom"
import Genre from "../components/Genre"

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [bookGenres, setBookGenres] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        const res = await axios.get(`http://localhost:1000/books/${id}`);
        setBook(res.data);
        setBookGenres(res.data.genres);
        setIsLoading(false)
    }, [])

    return (
        isLoading ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2> : <main className="bookDetails">
            <div className="bd-left">
                <img src={book.img} alt="" />
            </div>
            <div className="bd-right">
                <h2>About this book</h2>
                <div className="book-info">
                    <h3>Title: </h3> <span>{book.title}</span>
                </div>
                <div className="book-info">
                    <h3>Author: </h3> <span>{book.author}</span>
                </div>
                <div className="book-info">
                    <h3>Publisher: </h3> <span>{book.publisher}</span>
                </div>
                <div className="book-info">
                    <h3>Genres: </h3>
                    {bookGenres.map((bg, k) => (
                        <Genre key={k} item={bg} />
                    ))}
                </div>
                <div className="book-info">
                    <h3>Synopsis: </h3> <span style={{ width: "80%" }}>{book.synopsis}</span>
                </div>
                <div className="book-info">
                    <h3>Copise left: </h3> <span>{book.copise}</span>
                </div>
            </div>
        </main>
    )
}

export default BookDetails
