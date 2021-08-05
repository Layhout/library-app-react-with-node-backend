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
        const allVisitors = await fetchVisitor();
        allVisitors.sort((a, b) => (a.id - b.id));
        setVisitorState(allVisitors);
        setIsLoading(false);
    }, [])

    const sortVisitor = async (by) => {
        const allVisitors = await fetchVisitor();
        setVisitorState(allVisitors.sort((a, b) => (a[by] < b[by]) ? -1 : 1));
    }

    const searchVisitor = async (term) => {
        const allVisitors = await fetchVisitor();
        allVisitors.sort((a, b) => (a["name"] < b["name"]) ? -1 : 1);
        setVisitorState(allVisitors.filter((visitor => {
            const tVName = visitor.name.toLowerCase();
            return tVName.includes(term.toLowerCase());
        })));
    }

    const updVisitorState = (editedVisitor) => {
        setVisitorState(prev => prev.filter((p) => p.id !== editedVisitor.id));
        setVisitorState(prev => prev.concat(editedVisitor));
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
                                <VisitorInfo key={vs.id} visitor={vs} updVS={updVisitorState} />
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
