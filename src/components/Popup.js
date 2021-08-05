import "./Popup.css"
import { useEffect, useRef, useState } from "react";
import Genre from "./Genre";
import Backdrop from "./Backdrop";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NewBookForm = ({ closePopup, addBook, edit, b2Edit, editedBook }) => {
    const [imgUrl, setImgUrl] = useState("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [des, setDes] = useState("");
    const [copise, setCopise] = useState("");
    const inputRef = useRef();
    const [genres, setGenres] = useState([]);
    const [popupTitle, setPopupTitle] = useState("Adding a new book")

    useEffect(() => {
        if (edit) {
            setImgUrl(b2Edit.img);
            setTitle(b2Edit.title);
            setAuthor(b2Edit.author);
            setPublisher(b2Edit.publisher);
            setDes(b2Edit.synopsis);
            setCopise(b2Edit.copise);
            setGenres(b2Edit.genres);
            setPopupTitle("Editing a Book Info")
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!edit) {
            const res = await axios.post("http://localhost:1000/books", { title: title.trim(), img: imgUrl.trim(), author: author.trim(), publisher: publisher.trim(), genres, synopsis: des, copise });
            addBook(prev => prev.concat(res.data));
            closePopup(prev => !prev);
        } else {
            const res = await axios.patch(`http://localhost:1000/books/${b2Edit.id}`, { title: title.trim(), img: imgUrl.trim(), author: author.trim(), publisher: publisher.trim(), genres, synopsis: des, copise });
            editedBook(res.data);
            closePopup(prev => !prev);
        }
    }

    const addGenre = (item) => {
        if (item.startsWith(" ")) {
            inputRef.current.value = "";
        } else if (item.startsWith(",")) {
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
                <h1>{popupTitle}</h1>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title of the book" required />
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                            <label htmlFor="title">Author: </label>
                            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Who wrote the book?" required />
                        </div>
                        <div>
                            <label htmlFor="title">Publisher: </label>
                            <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Who publishered the book?" required />
                        </div>
                    </div>
                    <label htmlFor="title">Description: </label>
                    <textarea name="" id="description" rows="5" style={{ marginBottom: "5px" }} value={des} onChange={(e) => setDes(e.target.value)} placeholder="What's the book about?" required></textarea>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                            <label htmlFor="title">Genre: </label>
                            <input type="text" onChange={(e) => addGenre(e.target.value, e)} ref={inputRef} style={{ margin: "0" }} placeholder="press (,) to add a genre..." />
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
                            <input type="number" min={0} value={copise} onChange={(e) => setCopise(e.target.value)} placeholder="Number of books..." required />
                        </div>
                    </div>
                    <label htmlFor="title" >Image Url: </label>
                    <input type="text" onChange={(e) => setImgUrl(e.target.value)} placeholder="Please use image link from Google..." />
                    <div className="actions">
                        <button className="btn" style={{ backgroundColor: "lightgray", color: "black" }} onClick={() => closePopup(prev => !prev)}>Cancel</button>
                        <button className="btn" type="submit" style={{ backgroundColor: "#52c41a" }} >Save</button>
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
            <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Do you really want to delete <span style={{ textTransform: "capitalize" }}>{bTitle}</span> from DataBase?</h1>
            <div className="delete-actions">
                <button className="btn" style={{ backgroundColor: "lightgrey", color: "black" }} onClick={() => closePopup(prev => !prev)}>cancel</button>
                <button className="btn" style={{ backgroundColor: "#E53935" }} onClick={() => handleConfirm(bId)}>confirm</button>
            </div>
        </section>
    )
}

const NewVisitorForm = ({ closePopup, addVisitor, edit, v2Edit, updVS }) => {
    const [fname, setFname] = useState("");
    const [pNum, setPNum] = useState("");
    const [popupTitle, setPopupTitle] = useState("Add a New Visitor")

    useEffect(() => {
        if (edit) {
            setFname(v2Edit.name);
            setPNum(v2Edit.phone);
            setPopupTitle("Editing a Visitor Info");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!edit) {
            const res = await axios.post("http://localhost:1000/visitors", { name: fname, phone: pNum });
            addVisitor(prev => prev.concat(res.data));
            closePopup(prev => !prev);
        } else {
            const res = await axios.patch(`http://localhost:1000/visitors/${v2Edit.id}`, { name: fname, phone: pNum });
            updVS(res.data);
            closePopup(prev => !prev);
        }
    }

    return (
        <section style={{ padding: "40px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{popupTitle}</h1>
            <form className="input-form" onSubmit={handleSubmit}>
                <label htmlFor="">Full Name:</label>
                <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="First name and last name" required />
                <label htmlFor="">Phone:</label>
                <input type="text" value={pNum} onChange={(e) => setPNum(e.target.value)} placeholder="Phone number" required />
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                    <button className="btn" style={{ backgroundColor: "lightgrey", color: "black" }} onClick={() => closePopup(prev => !prev)}>Cancel</button>
                    <button className="btn" type="submit" style={{ backgroundColor: "#52c41a" }}>Save</button>
                </div>
            </form>
        </section>
    )
}

const NewCardForm = ({ closePopup, addCard }) => {
    const [allVisitor, setAllVisitor] = useState([])
    const [allBook, setAllBook] = useState([]);
    const [selectedVisitor, setSelectedVisitor] = useState("");
    const [selectedBook, setSelectedBook] = useState("");

    useEffect(async () => {
        const res1 = await axios.get("http://localhost:1000/visitors");
        setAllVisitor(res1.data);
        const res2 = await axios.get("http://localhost:1000/books");
        setAllBook(res2.data);
    }, [])

    const formatedToday = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const hh = String(today.getHours() % 12).padStart(2, "0");
        const mm = String(today.getMinutes()).padStart(2, "0");
        const ampm = hh >= 12 ? "pm" : "am";
        return dd + '/' + MM + '/' + yyyy + " (" + hh + ":" + mm + " " + ampm + ")";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:1000/cards", { visitor: selectedVisitor, book: selectedBook, bDate: formatedToday(), rDate: "" });
        addCard(prev => prev.concat(res.data));
        closePopup(prev => !prev)
    }

    return (
        <section style={{ padding: "40px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>New Card</h1>
            <form className="input-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="">Visitor:</label>
                <select name="" id="" onChange={(e) => setSelectedVisitor(e.target.value)}>
                    <option value="">Select</option>
                    {allVisitor.map((av) => (
                        <option value={av.name} key={av.id}>{av.name}</option>
                    ))}
                </select>
                <label htmlFor="">Book:</label>
                <select name="" id="" onChange={(e) => setSelectedBook(e.target.value)}>
                    <option value="">Select</option>
                    {allBook.map((ab) => (
                        <option value={ab.title} key={ab.id}>{ab.title}</option>
                    ))}
                </select>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                    <button className="btn" style={{ backgroundColor: "lightgrey", color: "black" }} onClick={() => closePopup(prev => !prev)}>Cancel</button>
                    <button className="btn" type="submit" style={{ backgroundColor: "#52c41a" }}>Save</button>
                </div>
            </form>
        </section>
    )
}

const SwitchPopup = ({ type, closePopup, addBook, bTitle, bId, b2Edit, editedBook, addVisitor, v2Edit, updVS, addCard }) => {
    switch (type) {
        case "newBook":
            return <NewBookForm closePopup={closePopup} addBook={addBook} />
        case "deleteBook":
            return <DeleteBook closePopup={closePopup} bTitle={bTitle} bId={bId} />
        case "editBook":
            return <NewBookForm closePopup={closePopup} edit={true} b2Edit={b2Edit} editedBook={editedBook} />
        case "newVisitor":
            return <NewVisitorForm closePopup={closePopup} addVisitor={addVisitor} />
        case "editVisitor":
            return <NewVisitorForm closePopup={closePopup} edit={true} v2Edit={v2Edit} updVS={updVS} />
        case "newCard":
            return <NewCardForm closePopup={closePopup} addCard={addCard} />
        default:
            return <div style={{ textAlign: "center" }}>
                You didn't specify the correct kind of Popup.
            </div>
    }
}

const Popup = ({ type, closePopup, addBook, bTitle, bId, b2Edit, editedBook, addVisitor, v2Edit, updVS, addCard }) => {
    return (
        <div>
            <Backdrop closePopup={closePopup} />
            <div className={`popup ${type === "deleteBook" ? "delete-book" : ""}`}>
                <SwitchPopup type={type} closePopup={closePopup} addBook={addBook} bTitle={bTitle} bId={bId} b2Edit={b2Edit} editedBook={editedBook} addVisitor={addVisitor} v2Edit={v2Edit} updVS={updVS} addCard={addCard} />
            </div>
        </div>
    )
}

export default Popup
