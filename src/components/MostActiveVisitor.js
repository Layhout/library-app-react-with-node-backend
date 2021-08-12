import "./styles/MostActiveVisitor.css"
import axios from "axios";
import { useEffect, useState } from "react";

const MostActiveVisitor = () => {
    const [firstV, setFirstV] = useState({});
    const [secondV, setSecondV] = useState({});
    const [thirdV, setThirdV] = useState({});
    const [fourthV, setFourthV] = useState({});
    const [fifthV, setFifthV] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [dataIsHere, setDataIsHere] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:1000/visitors/top5").then((res) => {
            setFirstV(res.data[0]);
            setSecondV(res.data[1]);
            setThirdV(res.data[2]);
            setFourthV(res.data[3]);
            setFifthV(res.data[4]);
            setIsLoading(false);
            setDataIsHere(true);
        }).catch((err) => {
            setIsLoading(false);
            setIsError(true);
            setErrMsg(err.message);
        });
    }, [])

    return (
        <div>
            {isLoading && <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2>}
            {isError && <h2 style={{ textAlign: "center", marginTop: "30px" }}>{errMsg}</h2>}
            {dataIsHere && <div className="mav">
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
            </div>}
        </div>
    )
}

export default MostActiveVisitor
