import "./styles/Popup.css"
import { useContext, useEffect, useRef, useState } from "react";
import Genre from "./Genre";
import Backdrop from "./Backdrop";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import formatedToday from "./formatedToday";
import { BookContext } from "../contexts/BookContext";
import { VisitorContext } from "../contexts/VisitorContext";
import { CardContext } from "../contexts/CardContext";

const NewBookForm = ({ closePopup, edit, b2Edit, editedBook }) => {
    const [imgUrl, setImgUrl] = useState("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [des, setDes] = useState("");
    const [copies, setCopies] = useState("");
    const inputRef = useRef();
    const [genres, setGenres] = useState([]);
    const [popupTitle, setPopupTitle] = useState("Adding a new book");
    const { bookDispatch } = useContext(BookContext);

    useEffect(() => {
        if (edit) {
            setImgUrl(b2Edit.img);
            setTitle(b2Edit.title);
            setAuthor(b2Edit.author);
            setPublisher(b2Edit.publisher);
            setDes(b2Edit.synopsis);
            setCopies(b2Edit.copies);
            setGenres(b2Edit.genres);
            setPopupTitle("Editing a Book Info")
        }
    }, [b2Edit, edit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!edit) {
            try {
                const res = await axios.post("http://localhost:1000/books/add", { title, img: imgUrl, author, publisher, genres, synopsis: des, copies, borrowed: 0 });
                bookDispatch({ type: "ADD_BOOK", data: res.data })
                closePopup(prev => !prev);
            } catch (err) {
                if (err.response.status === 409) {
                    alert(`Add book fail. ${title} already exists in DataBase. Please edit it instead.`);
                    closePopup(prev => !prev);
                } else {
                    alert("Server failure " + err.message);
                    closePopup(prev => !prev);
                }
            }

        } else {
            try {
                const res = await axios.patch("http://localhost:1000/books/edit", { id: b2Edit._id, title, img: imgUrl, author, publisher, genres, synopsis: des, copies });
                editedBook(res.data);
                bookDispatch({ type: "UPDATE_ONE_BOOK", data: res.data });
                closePopup(prev => !prev);
            } catch (err) {
                if (err.response.status === 400) {
                    alert("Edit fail. Something's wrong and it not the server.");
                    closePopup(prev => !prev);
                } else {
                    alert(err.message);
                    closePopup(prev => !prev);
                }
            }
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
                <form onSubmit={handleSubmit}>
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
                            <label htmlFor="title">copies: </label>
                            <input type="number" min={0} value={copies} onChange={(e) => setCopies(e.target.value)} placeholder="Number of books..." required />
                        </div>
                    </div>
                    <label htmlFor="title" >Image Url: </label>
                    <input type="text" onChange={(e) => setImgUrl(e.target.value)} placeholder="Please use image link from Google..." />
                    <div className="actions">
                        <button className="btn" type="button" style={{ backgroundColor: "lightgray", color: "black" }} onClick={() => closePopup(prev => !prev)}>Cancel</button>
                        <button className="btn" type="submit" style={{ backgroundColor: "#52c41a" }} >Save</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

const DeleteBook = ({ closePopup, bTitle }) => {
    const history = useHistory();
    const { id } = useParams();

    const handleConfirm = async (id) => {
        try {
            await axios.delete(`http://localhost:1000/books/book/${id}`);
            history.push("/");
        } catch (err) {
            if (err.response.status === 404) {
                alert("This book dosen't exist to be deleted");
                history.push("/");
            } else {
                alert(err.message);
                history.push("/");
            }
        }
    }

    return (
        <section className="delete-book">
            <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Do you really want to delete <span style={{ textTransform: "capitalize" }}>{bTitle}</span> from DataBase?</h1>
            <div className="delete-actions">
                <button className="btn" style={{ backgroundColor: "lightgrey", color: "black" }} onClick={() => closePopup(prev => !prev)}>cancel</button>
                <button className="btn" style={{ backgroundColor: "#E53935" }} onClick={() => handleConfirm(id)}>confirm</button>
            </div>
        </section>
    )
}

const NewVisitorForm = ({ closePopup, edit, v2Edit }) => {
    const [fname, setFname] = useState("");
    const [pNum, setPNum] = useState("");
    const [popupTitle, setPopupTitle] = useState("Add a New Visitor");
    const { visitorDispatch } = useContext(VisitorContext);

    useEffect(() => {
        if (edit) {
            setFname(v2Edit.name);
            setPNum(v2Edit.phone);
            setPopupTitle("Editing a Visitor Info");
        }
    }, [edit, v2Edit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!edit) {
            try {
                const res = await axios.post("http://localhost:1000/visitors/add", { name: fname, phone: pNum, borrowRecord: [] });
                visitorDispatch({ type: "ADD_VISITOR", data: res.data });
                closePopup(prev => !prev);
            } catch (err) {
                if (err.response.status === 409) {
                    alert(`Add visitor fail. ${fname} already exists in DataBase.`);
                    return;
                } else {
                    alert("Server failure " + err.message);
                    closePopup(prev => !prev);
                }
            }
        } else {
            try {
                const res = await axios.patch("http://localhost:1000/visitors/edit", { id: v2Edit._id, name: fname, phone: pNum });
                visitorDispatch({ type: "UPDATE_ONE_VISITOR", data: res.data });
                closePopup(prev => !prev);
            } catch (err) {
                if (err.response.status === 400) {
                    alert("Update fail.")
                    closePopup(prev => !prev);
                } else {
                    alert(err.message);
                    closePopup(prev => !prev);
                }
            }
        }
    }

    return (
        <section style={{ padding: "40px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{popupTitle}</h1>
            <form className="input-form" onSubmit={handleSubmit}>
                <label htmlFor="">Full Name:</label>
                <input type="text" value={fname} onChange={(e) => setFname(e.target.value.toLowerCase())} placeholder="First name and last name" required />
                <label htmlFor="">Phone:</label>
                <input type="text" value={pNum} onChange={(e) => setPNum(e.target.value)} placeholder="Phone number" required />
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                    <button className="btn" type="button" style={{ backgroundColor: "lightgrey", color: "black" }} onClick={() => closePopup(prev => !prev)}>Cancel</button>
                    <button className="btn" type="submit" style={{ backgroundColor: "#52c41a" }}>Save</button>
                </div>
            </form>
        </section>
    )
}

const NewCardForm = ({ closePopup }) => {
    const [allVisitor, setAllVisitor] = useState([])
    const [allBook, setAllBook] = useState([]);
    const [selectedVisitor, setSelectedVisitor] = useState("");
    const [selectedBook, setSelectedBook] = useState("");
    const { cardDispatch } = useContext(CardContext);

    useEffect(() => {
        axios.get("http://localhost:1000/visitors").then((res) => {
            setAllVisitor(res.data);
        }).catch((err) => {
            alert(err.message);
        })
        axios.get("http://localhost:1000/books").then((res) => {
            setAllBook(res.data.filter(rd => rd.copies > 0));
        }).catch((err) => {
            alert(err.message);
        })
    }, [])

    const subIdName = (value) => {
        const id = value.split(" ")[0];
        const text = value.substr(value.indexOf(" ") + 1);
        return { id, text };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const visitor = subIdName(selectedVisitor);
        const book = subIdName(selectedBook);
        try {
            await axios.patch("http://localhost:1000/visitors/updBorrow", { id: visitor.id, borrowedBook: book.text });
            await axios.patch("http://localhost:1000/books/updBorrow", { id: book.id });
            const res = await axios.post("http://localhost:1000/cards/add", { visitorId: visitor.id, visitor: visitor.text, bookId: book.id, book: book.text, bDate: formatedToday(), rDate: "" });
            console.log(res.data);
            cardDispatch({ type: "ADD_CARD", data: res.data });
        } catch (err) {
            alert(err.message);
        }
        closePopup(prev => !prev)
    }

    return (
        <section style={{ padding: "40px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>New Card</h1>
            <form className="input-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="">Visitor:</label>
                <select onChange={(e) => setSelectedVisitor(e.target.value)}>
                    <option value="">Select</option>
                    {allVisitor.map((a, k) => (
                        <option value={a._id + " " + a.name} key={k}>{a.name}</option>
                    ))}
                </select>
                <label htmlFor="">Book:</label>
                <select onChange={(e) => setSelectedBook(e.target.value)}>
                    <option value="">Select</option>
                    {allBook.map((b, k) => (
                        <option value={b._id + " " + b.title} key={k}>{b.title}</option>
                    ))}
                </select>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                    <button className="btn" type="button" style={{ backgroundColor: "lightgrey", color: "black" }} onClick={() => closePopup(prev => !prev)}>Cancel</button>
                    <button className="btn" type="submit" style={{ backgroundColor: "#52c41a" }}>Save</button>
                </div>
            </form>
        </section>
    )
}

const SwitchPopup = ({ type, closePopup, bTitle, b2Edit, editedBook, v2Edit }) => {
    switch (type) {
        case "newBook":
            return <NewBookForm closePopup={closePopup} />
        case "deleteBook":
            return <DeleteBook closePopup={closePopup} bTitle={bTitle} />
        case "editBook":
            return <NewBookForm closePopup={closePopup} edit={true} b2Edit={b2Edit} editedBook={editedBook} />
        case "newVisitor":
            return <NewVisitorForm closePopup={closePopup} />
        case "editVisitor":
            return <NewVisitorForm closePopup={closePopup} edit={true} v2Edit={v2Edit} />
        case "newCard":
            return <NewCardForm closePopup={closePopup} />
        default:
            return <div style={{ textAlign: "center" }}>
                You didn't specify the correct kind of Popup.
            </div>
    }
}

const Popup = ({ type, closePopup, bTitle, b2Edit, editedBook, v2Edit }) => {
    return (
        <div>
            <Backdrop closePopup={closePopup} />
            <div className={`popup ${type === "deleteBook" ? "delete-book" : ""}`}>
                <SwitchPopup type={type} closePopup={closePopup} bTitle={bTitle} b2Edit={b2Edit} editedBook={editedBook} v2Edit={v2Edit} />
            </div>
        </div>
    )
}

export default Popup
