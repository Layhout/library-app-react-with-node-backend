import "./MostActiveVisitor.css"
import axios from "axios";
import { useEffect, useState } from "react";

const MostActiveVisitor = () => {
    const [firstV, setFirstV] = useState({});
    const [secondV, setSecondV] = useState({});
    const [thirdV, setThirdV] = useState({});
    const [fourthV, setFourthV] = useState({});
    const [fifthV, setFifthV] = useState({});

    useEffect(() => {
        axios.get("http://localhost:1000/visitors").then((res) => {
            const sortedVisitor = res.data.sort((a, b) => b.borrowRecord.length - a.borrowRecord.length);
            setFirstV(sortedVisitor[0]);
            setSecondV(sortedVisitor[1]);
            setThirdV(sortedVisitor[2]);
            setFourthV(sortedVisitor[3]);
            setFifthV(sortedVisitor[4]);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <div className="mav">
            <h1>Top 5 Active Visitors of this Library</h1>
            <div className="first-place">
                <h2>1. {firstV.name}</h2>
                <h2>Borrow: {firstV.borrow} times</h2>
            </div>
            <div className="second-place">
                <h3>2. {secondV.name}</h3>
                <h3>Borrow: {secondV.borrow} times</h3>
            </div>
            <div className="third-place">
                <h3>3. {thirdV.name}</h3>
                <h3>Borrow: {thirdV.borrow} times</h3>
            </div>
            <div className="fourth-place">
                <h3>4. {fourthV.name}</h3>
                <h3>Borrow: {fourthV.borrow} times</h3>
            </div>
            <div className="fifth-palce">
                <h3>5. {fifthV.name}</h3>
                <h3>Borrow: {fifthV.borrow} times</h3>
            </div>
        </div>
    )
}

export default MostActiveVisitor
