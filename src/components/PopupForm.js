import "./PopupForm.css"
import { useState } from "react";

const NewBookForm = ({ closeForm, addBook }) => {
    const [imgUrl, setImgUrl] = useState("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(prev => [...prev, { title, img: imgUrl, author, publisher, genres: ["Adventure fiction", "Dark fantasy", "Martial Arts"], }]);
        closeForm(prev => !prev);
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
                    <input type="text" onChange={(e) => setTitle(e.target.value)} required />
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                            <label htmlFor="title">Author: </label>
                            <input type="text" onChange={(e) => setAuthor(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="title">Publisher: </label>
                            <input type="text" onChange={(e) => setPublisher(e.target.value)} required />
                        </div>
                    </div>
                    <label htmlFor="title">Description: </label>
                    <textarea name="" id="description" rows="5" required></textarea>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                            <label htmlFor="title">Genre: </label>
                            <input type="text" required />
                        </div>
                        <div>
                            <label htmlFor="title">Copise: </label>
                            <input type="number" min={0} required />
                        </div>
                    </div>
                    <label htmlFor="title" >Image Url: </label>
                    <input type="text" onChange={(e) => setImgUrl(e.target.value)} />
                    <div className="actions">
                        <button onClick={() => closeForm(prev => !prev)}>Cancel</button>
                        <button type="submit" style={{ backgroundColor: "#52c41a", color: "white" }} >Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const PopupForm = ({ closeForm, addBook }) => {
    return (
        <div className="popup">
            <NewBookForm closeForm={closeForm} addBook={addBook} />
        </div>
    )
}

export default PopupForm
