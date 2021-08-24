import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/TopBooks.css";

const TopBooks = () => {
    const [top5B, setTop5B] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:1000/books/top5").then((res) => {
            setTop5B(res.data)
        }).catch((err) => {
            setTop5B({ error: err.response.data.error });
        });
    }, [])

    return (
        <div>
            {top5B.error ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>{top5B.error}</h2> :
                top5B.length ? <div className="topBooks">
                    <h1>Top 5 Books of this Library</h1>
                    <div className="stage">
                        <div className="second">
                            <img src={top5B[1].img} alt="" />
                        </div>
                        <div className="first">
                            <img src={top5B[0].img} alt="" />
                        </div>
                        <div className="third">
                            <img src={top5B[2].img} alt="" />
                        </div>
                        <div className="title">
                            <h3>2. {top5B[1].title}</h3>
                            <span>Views: {top5B[1].borrowed}</span>
                        </div>
                        <div className="title">
                            <h3>1. {top5B[0].title}</h3>
                            <span>Views: {top5B[0].borrowed}</span>
                        </div>
                        <div className="title">
                            <h3>3. {top5B[2].title}</h3>
                            <span>Views: {top5B[2].borrowed}</span>
                        </div>
                    </div>
                    <div className="sub-stage">
                        <div>
                            <img src={top5B[3].img} alt="" />
                            <div className="title">
                                <h3>4. {top5B[3].title}</h3>
                                <span>Views: {top5B[3].borrowed}</span>
                            </div>
                        </div>
                        <div>
                            <img src={top5B[4].img} alt="" />
                            <div className="title">
                                <h3>5. {top5B[4].title}</h3>
                                <span>Views: {top5B[4].borrowed}</span>
                            </div>
                        </div>
                    </div>
                </div> : <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2>
            }
        </div>
    )
}

export default TopBooks
