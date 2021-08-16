import { useContext, useEffect, useState } from "react"
import ActionsBar from "../components/ActionsBar"
import Popup from "../components/Popup"
import VisitorInfo from "../components/VisitorInfo"
import { VisitorContext } from "../contexts/VisitorContext"
import "./styles/VisitorsList.css"

const Visitors = () => {
    const { visitors } = useContext(VisitorContext);
    const [visitorState, setVisitorState] = useState([]);
    const [btnAddVisitor, setBtnAddVisitor] = useState(false);

    useEffect(() => {
        setVisitorState(visitors);
    }, [visitors]);

    const sortVisitor = (by) => {
        setVisitorState(visitors.slice().sort((a, b) => (a[by].toLowerCase() < b[by].toLowerCase()) ? -1 : 1));
    }

    const searchVisitor = (term) => {
        setVisitorState(visitors.filter(v => v.name.includes(term.toLowerCase())));
    }

    return (
        <main className="visitorsList">
            <section>
                <ActionsBar sort={sortVisitor} search={searchVisitor} setBtnAdd={setBtnAddVisitor} sortOp={["ID", "name"]} searchBy="Search by name" btnName="Add new visitor" />
            </section>
            {visitorState.error ? <h2 style={{ textAlign: "center", marginTop: "30px" }}>{visitorState.error}</h2> :
                visitorState.length ? <section className="list">
                    <div className="list-header">
                        <h1>ID</h1>
                        <h1>Name</h1>
                        <h1>Phone</h1>
                        <h1>Edit</h1>
                    </div>
                    <div className="list-body">
                        {
                            <ul>
                                {visitorState.map((vs) => (
                                    <VisitorInfo key={vs._id} visitor={vs} />
                                ))}
                            </ul>
                        }
                    </div>
                </section> : <h2 style={{ textAlign: "center", marginTop: "30px" }}>{visitorState.error}</h2>
            }
            {btnAddVisitor && <Popup type="newVisitor" closePopup={setBtnAddVisitor} />}
        </main>
    )
}

export default Visitors
