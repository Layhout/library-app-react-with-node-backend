import axios from "axios"
import { useEffect, useState } from "react"
import ActionsBar from "../components/ActionsBar"
import Popup from "../components/Popup"
import VisitorInfo from "../components/VisitorInfo"
import "./VisitorsList.css"

const Visitors = () => {
    const [visitorState, setVisitorState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [btnAddVisitor, setBtnAddVisitor] = useState(false);

    const fetchVisitor = async () => {
        const res = await axios.get("http://localhost:1000/visitors");
        return res.data;
    }

    useEffect(async () => {
        setVisitorState(await fetchVisitor());
        setIsLoading(false);
    }, [])

    const sortVisitor = async (by) => {
        const allVisitors = await fetchVisitor();
        if (by === "name") {
            setVisitorState(allVisitors.sort((a, b) => (a[by].toLowerCase() < b[by].toLowerCase()) ? -1 : 1));
        } else {
            setVisitorState(allVisitors.sort((a, b) => (a[by] < b[by]) ? -1 : 1));
        }
    }

    const searchVisitor = async (term) => {
        const allVisitors = await fetchVisitor();
        allVisitors.sort((a, b) => (a["name"].toLowercase() < b["name"].toLowercase()) ? -1 : 1);
        setVisitorState(allVisitors.filter((visitor => {
            const tVName = visitor.name.toLowerCase();
            return tVName.includes(term.toLowerCase());
        })));
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
            <section className="list">
                <div className="list-header">
                    <h1>ID</h1>
                    <h1>Name</h1>
                    <h1>Phone</h1>
                    <h1>Edit</h1>
                </div>
                <div className="list-body">
                    {isLoading ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2> :
                        <ul>
                            {visitorState.map((vs, k) => (
                                <VisitorInfo key={vs.id} visitor={vs} updVS={updVisitorState} i={k} />
                            ))}
                        </ul>
                    }
                </div>
            </section>
            {btnAddVisitor && <Popup type="newVisitor" closePopup={setBtnAddVisitor} addVisitor={setVisitorState} />}
        </main>
    )
}

export default Visitors
