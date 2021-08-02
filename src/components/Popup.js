import "./Popup.css"
import { useRef, useState } from "react";
import Genre from "./Genre";
import Backdrop from "./Backdrop";
import axios from "axios";

const NewBookForm = ({ closeForm, addBook }) => {
    const [imgUrl, setImgUrl] = useState("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const inputRef = useRef();
    const [genres, setGenres] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(prev => [...prev, { title, img: imgUrl, author, publisher, genres, }]);
        closeForm(prev => !prev);
    }

    const addGenre = (item) => {
        if (item.includes(",")) {
            setGenres(prev => [...prev, item.replace(",", "")]);
            inputRef.current.value = "";
        }
    }

    return (
        <div className="newBookForm">
            <div className="img-preview">
                <img src={imgUrl} alt="" />
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
                    <textarea name="" id="description" rows="5" style={{ marginBottom: "5px" }} placeholder="What's the book about?" required></textarea>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                            <label htmlFor="title">Genre: </label>
                            <input type="text" onChange={(e) => addGenre(e.target.value)} ref={inputRef} style={{ margin: "0" }} placeholder="press (,) to add a genre..." />
                            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "5px", marginBottom: "10px" }}>
                                {genres.map((genre, k) => (
                                    <Genre key={k} item={genre} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="title">Copise: </label>
                            <input type="number" min={0} placeholder="Number of books..." required />
                        </div>
                    </div>
                    <label htmlFor="title" >Image Url: </label>
                    <input type="text" onChange={(e) => setImgUrl(e.target.value)} placeholder="Please use image link from Google..." />
                    <div className="actions">
                        <button onClick={() => closeForm(prev => !prev)}>Cancel</button>
                        <button type="submit" style={{ backgroundColor: "#52c41a", color: "white" }} >Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const SwitchPopup = ({ type, closeForm, addBook }) => {
    switch (type) {
        case "newBook":
            return <NewBookForm closeForm={closeForm} addBook={addBook} />

    }
}

const Popup = ({ type, closeForm, addBook }) => {
    return (
        <div>
            <Backdrop closeForm={closeForm} />
            <div className="popup">
                <SwitchPopup type={type} closeForm={closeForm} addBook={addBook} />
            </div>
        </div>
    )
}

export default Popup
