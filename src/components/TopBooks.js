import axios from "axios";
import { useEffect, useState } from "react";
import "./TopBooks.css";

const TopBooks = () => {
    const [firstBook, setFirstBook] = useState({});
    const [secondBook, setSecondBook] = useState({});
    const [thirdBook, setThirdBook] = useState({});
    const [fourthBook, setFourthBook] = useState({});
    const [fifthBook, setFifthBook] = useState({});

    useEffect(() => {
        axios.get("http://localhost:1000/books?_sort=borrowed&_order=desc&_limit=5").then((res) => {
            setFirstBook(res.data[0]);
            setSecondBook(res.data[1]);
            setThirdBook(res.data[2]);
            setFourthBook(res.data[3]);
            setFifthBook(res.data[4]);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <div className="topBooks">
            <h1>Top 5 Books of this Library</h1>
            <div className="stage">
                <div className="second">
                    <img src={secondBook.img} alt="" />
                </div>
                <div className="first">
                    <img src={firstBook.img} alt="" />
                </div>
                <div className="third">
                    <img src={thirdBook.img} alt="" />
                </div>
                <div className="title">
                    <h3>2. {secondBook.title}</h3>
                    <span>Views: {secondBook.borrowed}</span>
                </div>
                <div className="title">
                    <h3>1. {firstBook.title}</h3>
                    <span>Views: {firstBook.borrowed}</span>
                </div>
                <div className="title">
                    <h3>3. {thirdBook.title}</h3>
                    <span>Views: {thirdBook.borrowed}</span>
                </div>
            </div>
            <div className="sub-stage">
                <div>
                    <img src={fourthBook.img} alt="" />
                    <div className="title">
                        <h3>4. {fourthBook.title}</h3>
                        <span>Views: {fourthBook.borrowed}</span>
                    </div>
                </div>
                <div>
                    <img src={fifthBook.img} alt="" />
                    <div className="title">
                        <h3>5. {fifthBook.title}</h3>
                        <span>Views: {fifthBook.borrowed}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBooks
