import { useState } from "react"
import Popup from "./Popup"
import "./VisitorInfo.css"

const VisitorInfo = ({ visitor, updVS, i }) => {
    const [btnEditV, setBtnEditV] = useState(false);

    return (
        <li className="visitorInfo">
            <div className="list-info">
                {visitor._id.substr(-6)}
            </div>
            <div className="list-info">
                {visitor.name}
            </div>
            <div className="list-info">
                {visitor.phone}
            </div>
            <div className="list-action">
                <span onClick={() => setBtnEditV(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="edit-icon" style={{ width: "25px", }} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </span>
            </div>
            {btnEditV && <Popup type="editVisitor" closePopup={setBtnEditV} v2Edit={visitor} updVS={updVS} i={i} />}
        </li>
    )
}

export default VisitorInfo
