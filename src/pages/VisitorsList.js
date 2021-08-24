import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ActionsBar from "../components/ActionsBar"
import Popup from "../components/Popup"
import VisitorInfo from "../components/VisitorInfo"
import "./styles/VisitorsList.css"

const Visitors = () => {
    const [visitorState, setVisitorState] = useState([]);
    const [btnAddVisitor, setBtnAddVisitor] = useState(false);
    const visitors = useSelector(state => state.visitors);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:1000/visitors").then((res) => {
            dispatch({ type: "LOAD_VISITOR", data: res.data });
        }).catch((err) => dispatch({ type: "LOAD_VISITOR", data: { error: err.response.data.error } }));
    }, [dispatch])

    useEffect(() => {
        setVisitorState(visitors);
    }, [visitors]);

    const sortVisitor = (by) => {
        if (by === "ID") {
            setVisitorState(prev => prev.slice().sort((a, b) => (a._id - b._id)));
        } else {
            setVisitorState(prev => prev.slice().sort((a, b) => (a[by].toLowerCase() < b[by].toLowerCase()) ? -1 : 1));
        }
    }

    const searchVisitor = (term) => {
        const matchedvisitor = visitors.filter((v) => v.name.toLowerCase().includes(term.toLowerCase()));
        if (matchedvisitor.length !== 0) {
            setVisitorState(matchedvisitor);
        } else {
            setVisitorState({ error: `No visitor named: "${term}"` });
        }
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
