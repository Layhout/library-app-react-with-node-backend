import { useContext, useEffect, useState } from "react"
import "./styles/BookDetails.css"
import { useParams } from "react-router-dom"
import Genre from "../components/Genre"
import Popup from "../components/Popup"
import { BookContext } from "../contexts/BookContext"

const BookDetails = () => {
    const { id } = useParams();
    const [bookState, setBookState] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [btnDelete, setBtnDelete] = useState(false);
    const [btnEdit, setBtnEdit] = useState(false);
    const [isError, setIsError] = useState("");
    const { books } = useContext(BookContext);

    useEffect(() => {
        const foundBook = books.find(b => b._id === id);
        if (foundBook) {
            setBookState(foundBook);
            setIsLoading(false);
            setIsError("");
        } else {
            setIsLoading(false);
            setIsError("This book doesn't exist in the DataBase...");
        }
    }, [id, books])

    return (
        <main>
            {isLoading ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2> :
                isError ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>{isError}</h2> :
                    <div className="bookDetails">
                        <div className="bd-left">
                            <img src={bookState.img} alt="" />
                        </div>
                        <div className="bd-right">
                            <h2>About this book</h2>
                            <div className="book-info">
                                <h3>Title: </h3> <span>{bookState.title}</span>
                            </div>
                            <div className="book-info">
                                <h3>Author: </h3> <span>{bookState.author}</span>
                            </div>
                            <div className="book-info">
                                <h3>Publisher: </h3> <span>{bookState.publisher}</span>
                            </div>
                            <div className="book-info">
                                <h3>Genres: </h3>
                                {bookState.genres.map((bg, k) => (
                                    <Genre key={k} item={bg} />
                                ))}
                            </div>
                            <div className="book-info">
                                <h3>Synopsis: </h3> <p style={{ width: "80%" }}>{bookState.synopsis}</p>
                            </div>
                            <div className="book-info">
                                <h3>copies left: </h3> <span>{bookState.copies}</span>
                            </div>
                            <div className="book-actions">
                                <button className="btn" style={{ backgroundColor: "#E53935" }} onClick={() => setBtnDelete(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "25px", marginRight: "10px" }} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    delete
                                </button>
                                <button className="btn" style={{ backgroundColor: "#24a0ed", marginLeft: "20px" }} onClick={() => setBtnEdit(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "25px", marginRight: "10px" }} viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    edit
                                </button>
                            </div>
                        </div>
                        {btnDelete && <Popup type="deleteBook" closePopup={setBtnDelete} />}
                        {btnEdit && <Popup type="editBook" closePopup={setBtnEdit} />}
                    </div>
            }
        </main>
    )
}

export default BookDetails
