import "./styles/Popup.css"
import { useEffect, useRef, useState } from "react";
import Genre from "./Genre";
import Backdrop from "./Backdrop";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import formatedToday from "./formatedToday";
import { useDispatch, useSelector } from "react-redux";

const NewBookForm = ({ closePopup, edit }) => {
    const [imgUrl, setImgUrl] = useState("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg");
    const genresRef = useRef();
    const [genres, setGenres] = useState([]);
    const [popupTitle, setPopupTitle] = useState("Adding a new book");
    const titleRef = useRef();
    const authorRef = useRef();
    const publisherRef = useRef();
    const desRef = useRef();
    const copiesRef = useRef();
    const { id } = useParams();
    const books = useSelector(state => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        if (edit) {
            const b2Edit = books.find(b => b._id === id);
            setImgUrl(b2Edit.img);
            titleRef.current.value = b2Edit.title;
            authorRef.current.value = b2Edit.author;
            publisherRef.current.value = b2Edit.publisher;
            desRef.current.value = b2Edit.synopsis;
            copiesRef.current.value = b2Edit.copies;
            setGenres(b2Edit.genres);
            setPopupTitle("Editing a Book Info")
        }
    }, [books, edit, id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!edit) {
            try {
                const res = await axios.post("http://localhost:1000/books/add", {
                    title: titleRef.current.value,
                    img: imgUrl,
                    author: authorRef.current.value,
                    publisher: publisherRef.current.value,
                    genres,
                    synopsis: desRef.current.value,
                    copies: copiesRef.current.value,
                    borrowed: 0
                });
                dispatch({ type: "ADD_BOOK", data: res.data })
                closePopup(prev => !prev);
            } catch (err) {
                if (err.response.status === 409) {
                    alert(`Add book fail. ${titleRef.current.value} already exists in DataBase. Please edit it instead.`);
                    closePopup(prev => !prev);
                } else {
                    alert("Server failure " + err.message);
                    closePopup(prev => !prev);
                }
            }

        } else {
            try {
                const res = await axios.patch(`http://localhost:1000/books/edit/${id}`, {
                    title: titleRef.current.value,
                    img: imgUrl,
                    author: authorRef.current.value,
                    publisher: publisherRef.current.value,
                    genres,
                    synopsis: desRef.current.value,
                    copies: copiesRef.current.value,
                });
                dispatch({ type: "UPDATE_ONE_BOOK", data: res.data });
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
            genresRef.current.value = "";
        } else if (item.startsWith(",")) {
            genresRef.current.value = "";
        } else if (item.endsWith(",")) {
            setGenres(prev => prev.concat(item.replace(",", "")));
            genresRef.current.value = "";
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
                    <input type="text" ref={titleRef} placeholder="Title of the book" required />
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                            <label htmlFor="title">Author: </label>
                            <input type="text" ref={authorRef} placeholder="Who wrote the book?" required />
                        </div>
                        <div>
                            <label htmlFor="title">Publisher: </label>
                            <input type="text" ref={publisherRef} placeholder="Who publishered the book?" required />
                        </div>
                    </div>
                    <label htmlFor="title">Description: </label>
                    <textarea name="" id="description" rows="5" style={{ marginBottom: "5px" }} ref={desRef} placeholder="What's the book about?" required></textarea>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                            <label htmlFor="title">Genre: </label>
                            <input type="text" onChange={(e) => addGenre(e.target.value)} ref={genresRef} style={{ margin: "0" }} placeholder="press (,) to add a genre..." />
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
                            <input type="number" min={0} ref={copiesRef} placeholder="Number of books..." required />
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

const DeleteBook = ({ closePopup }) => {
    const history = useHistory();
    const { id } = useParams();
    const [bTitle, setBTitle] = useState("");
    const books = useSelector(state => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        const { title } = books.find(b => b._id === id);
        setBTitle(title);
    }, [id, books])

    const handleConfirm = async () => {
        try {
            await axios.delete(`http://localhost:1000/books/book/${id}`);
            dispatch({ type: "REMOVE_BOOK", data: id });
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
                <button className="btn" style={{ backgroundColor: "#E53935" }} onClick={handleConfirm}>confirm</button>
            </div>
        </section>
    )
}

const NewVisitorForm = ({ closePopup, edit, v2Edit }) => {
    const fname = useRef("");
    const pNum = useRef("");
    const [popupTitle, setPopupTitle] = useState("Add a New Visitor");
    const dispatch = useDispatch();

    useEffect(() => {
        if (edit) {
            fname.current.value = v2Edit.name;
            pNum.current.value = v2Edit.phone;
            setPopupTitle("Editing a Visitor Info");
        }
    }, [edit, v2Edit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!edit) {
            try {
                const res = await axios.post("http://localhost:1000/visitors/add", { name: fname.current.value, phone: pNum.current.value, borrowRecord: [] });
                dispatch({ type: "ADD_VISITOR", data: res.data });
                closePopup(prev => !prev);
            } catch (err) {
                if (err.response.status === 409) {
                    alert(`Add visitor fail. ${fname.current.value} already exists in DataBase.`);
                    closePopup(prev => !prev);
                } else {
                    alert("Server failure " + err.message);
                    closePopup(prev => !prev);
                }
            }
        } else {
            try {
                const res = await axios.patch("http://localhost:1000/visitors/edit", { id: v2Edit._id, name: fname.current.value, phone: pNum.current.value });
                dispatch({ type: "UPDATE_ONE_VISITOR", data: res.data });
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
                <input type="text" ref={fname} placeholder="First name and last name" required />
                <label htmlFor="">Phone:</label>
                <input type="text" ref={pNum} placeholder="Phone number" required />
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
    const dispatch = useDispatch();

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
            dispatch({ type: "ADD_CARD", data: res.data });
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

const SwitchPopup = ({ type, closePopup, v2Edit }) => {
    switch (type) {
        case "newBook":
            return <NewBookForm closePopup={closePopup} />
        case "deleteBook":
            return <DeleteBook closePopup={closePopup} />
        case "editBook":
            return <NewBookForm closePopup={closePopup} edit={true} />
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

const Popup = ({ type, closePopup, v2Edit }) => {
    return (
        <div>
            <Backdrop closePopup={closePopup} />
            <div className={`popup ${type === "deleteBook" ? "delete-book" : ""}`}>
                <SwitchPopup type={type} closePopup={closePopup} v2Edit={v2Edit} />
            </div>
        </div>
    )
}

export default Popup
