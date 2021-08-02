import "./Popup.css"
import { useRef, useState } from "react";
import Genre from "./Genre";
import Backdrop from "./Backdrop";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NewBookForm = ({ closePopup, addBook }) => {
    const [imgUrl, setImgUrl] = useState("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [des, setDes] = useState("");
    const [copise, setCopise] = useState("");
    const inputRef = useRef();
    const [genres, setGenres] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:1000/books", { title, img: imgUrl, author, publisher, genres, synopsis: des, copise });
        addBook(prev => [...prev, res.data]);
        closePopup(prev => !prev);
    }

    const addGenre = (item) => {
        if (item.startsWith(" ") && item.startsWith(",")) {
            inputRef.current.value = "";
        } else if (item.endsWith(",")) {
            setGenres(prev => prev.concat(item.replace(",", "")));
            inputRef.current.value = "";
        }
    }

    const deleteGenre = (index) => {
        setGenres(prev => prev.filter(p => p !== index))
    }

    return (
        <section className="newBookForm">
            <div className="img-preview">
                <img src={imgUrl} alt="" onError={() => setImgUrl("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg")} />
            </div>
            <div className="input-form">
                <h1>Adding a new book</h1>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Title of the book" required />
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                            <label htmlFor="title">Author: </label>
                            <input type="text" onChange={(e) => setAuthor(e.target.value)} placeholder="Who wrote the book?" required />
                        </div>
                        <div>
                            <label htmlFor="title">Publisher: </label>
                            <input type="text" onChange={(e) => setPublisher(e.target.value)} placeholder="Who publishered the book?" required />
                        </div>
                    </div>
                    <label htmlFor="title">Description: </label>
                    <textarea name="" id="description" rows="5" style={{ marginBottom: "5px" }} onChange={(e) => setDes(e.target.value)} placeholder="What's the book about?" required></textarea>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                            <label htmlFor="title">Genre: </label>
                            <input type="text" onChange={(e) => addGenre(e.target.value)} ref={inputRef} style={{ margin: "0" }} placeholder="press (,) to add a genre..." />
                            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "5px", marginBottom: "10px" }}>
                                {genres.map((genre, k) => (
                                    <div key={k} onClick={(e) => deleteGenre(e.target.innerHTML)}>
                                        <Genre item={genre} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="title">Copise: </label>
                            <input type="number" min={0} onChange={(e) => setCopise(e.target.value)} placeholder="Number of books..." required />
                        </div>
                    </div>
                    <label htmlFor="title" >Image Url: </label>
                    <input type="text" onChange={(e) => setImgUrl(e.target.value)} placeholder="Please use image link from Google..." />
                    <div className="actions">
                        <button onClick={() => closePopup(prev => !prev)}>Cancel</button>
                        <button type="submit" style={{ backgroundColor: "#52c41a", color: "white" }} >Save</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

const DeleteBook = ({ closePopup, bTitle, bId }) => {
    const history = useHistory();

    const handleConfirm = async (id) => {
        await axios.delete(`http://localhost:1000/books/${id}`);
        history.push("/");
    }

    return (
        <section className="delete-book">
            <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Do you really want to delete {bTitle} from DataBase?</h1>
            <div className="delete-actions">
                <button style={{ backgroundColor: "#E53935" }} onClick={() => closePopup(prev => !prev)}>cancel</button>
                <button style={{ backgroundColor: "#0D47A1" }} onClick={() => handleConfirm(bId)}>confirm</button>
            </div>
        </section>
    )
}

const SwitchPopup = ({ type, closePopup, addBook, bTitle, bId }) => {
    switch (type) {
        case "newBook":
            return <NewBookForm closePopup={closePopup} addBook={addBook} />
        case "deleteBook":
            return <DeleteBook closePopup={closePopup} bTitle={bTitle} bId={bId} />
        default:
            return <div style={{ textAlign: "center" }}>
                You didn't specify the kind of Popup.
            </div>

    }
}

const Popup = ({ type, closePopup, addBook, bTitle, bId }) => {
    return (
        <div>
            <Backdrop closePopup={closePopup} />
            <div className={`popup ${type === "deleteBook" ? "delete-book" : ""}`}>
                <SwitchPopup type={type} closePopup={closePopup} addBook={addBook} bTitle={bTitle} bId={bId} />
            </div>
        </div>
    )
}

export default Popup
