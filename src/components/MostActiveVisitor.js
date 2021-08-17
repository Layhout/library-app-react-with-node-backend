import "./styles/MostActiveVisitor.css"
import axios from "axios";
import { useEffect, useState } from "react";

const MostActiveVisitor = () => {
    const [top5V, setTop5V] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:1000/visitors/top5").then((res) => {
            setTop5V(res.data);
        }).catch((err) => {
            setTop5V({ error: err.message });
        })
    }, [])

    return (
        <div>
            {top5V.error ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>{top5V.error}</h2> :
                top5V.length ? <div className="mav">
                    <h1>Top 5 Active Visitors of this Library</h1>
                    <div className="first-place">
                        <h2>1. {top5V[0].name}</h2>
                        <h2>Borrow: {top5V[0].borrowRecord.length} times</h2>
                    </div>
                    <div className="second-place">
                        <h3>2. {top5V[1].name}</h3>
                        <h3>Borrow: {top5V[1].borrowRecord.length} times</h3>
                    </div>
                    <div className="third-place">
                        <h3>3. {top5V[2].name}</h3>
                        <h3>Borrow: {top5V[2].borrowRecord.length} times</h3>
                    </div>
                    <div className="fourth-place">
                        <h3>4. {top5V[3].name}</h3>
                        <h3>Borrow: {top5V[3].borrowRecord.length} times</h3>
                    </div>
                    <div className="fifth-palce">
                        <h3>5. {top5V[4].name}</h3>
                        <h3>Borrow: {top5V[4].borrowRecord.length} times</h3>
                    </div>
                </div> : <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2>
            }

        </div>
    )
}

export default MostActiveVisitor
