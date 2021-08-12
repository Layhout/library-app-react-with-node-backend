import axios from "axios"
import { useEffect, useState } from "react"
import ActionsBar from "../components/ActionsBar"
import Popup from "../components/Popup"
import VisitorInfo from "../components/VisitorInfo"
import "./styles/VisitorsList.css"

const Visitors = () => {
    const [visitorState, setVisitorState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [btnAddVisitor, setBtnAddVisitor] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [dataIsHere, setDataIsHere] = useState(false);

    const fetchVisitor = async () => {
        try {
            const res = await axios.get("http://localhost:1000/visitors");
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        fetchVisitor().then((data) => {
            setVisitorState(data);
            setIsLoading(false);
            setDataIsHere(true);
        }).catch((err) => {
            setIsLoading(false);
            setIsError(true);
            setErrMsg("Server failure: " + err.message);
        })
    }, [])

    const sortVisitor = async (by) => {
        const allVisitors = await fetchVisitor();
        setVisitorState(allVisitors.sort((a, b) => (a[by] < b[by]) ? -1 : 1));
    }

    const searchVisitor = async (term) => {
        const allVisitors = await fetchVisitor();
        setVisitorState(allVisitors.filter(visitor => {
            return visitor.name.includes(term.toLowerCase());
        }));
    }

    const updVisitorState = (i, editedVisitor) => {
        const newVisitorState = [...visitorState];
        newVisitorState[i] = editedVisitor;
        setVisitorState(newVisitorState);
    }

    return (
        <main className="visitorsList">
            <section>
                <ActionsBar sort={sortVisitor} search={searchVisitor} setBtnAdd={setBtnAddVisitor} sortOp={["ID", "name"]} searchBy="Search by name" btnName="Add new visitor" />
            </section>
            {isLoading && <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2>}
            {isError && <h2 style={{ textAlign: "center", marginTop: "30px" }}>{errMsg}</h2>}
            {dataIsHere && <section className="list">
                <div className="list-header">
                    <h1>ID</h1>
                    <h1>Name</h1>
                    <h1>Phone</h1>
                    <h1>Edit</h1>
                </div>
                <div className="list-body">
                    {
                        <ul>
                            {visitorState.map((vs, k) => (
                                <VisitorInfo key={vs._id} visitor={vs} updVS={updVisitorState} i={k} />
                            ))}
                        </ul>
                    }
                </div>
            </section>}
            {btnAddVisitor && <Popup type="newVisitor" closePopup={setBtnAddVisitor} addVisitor={setVisitorState} />}
        </main>
    )
}

export default Visitors
