import "./styles/ActionsBar.css"

const ActionsBar = ({ sort, search, setBtnAdd, sortOp, btnName, searchBy }) => {
    return (
        <div className="actions">
            <div className="actionsLeft">
                <label htmlFor="sort">Sort By</label>
                <select name="sort" id="sort" onChange={(e) => sort(e.target.value)}>
                    {sortOp.map((s, k) => (
                        <option key={k} style={{ textTransform: "capitalize" }} value={s}>{s}</option>
                    ))}
                </select>
            </div>
            <div className="actionsMid">
                <div className="search-book">
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "25px", color: "#3DA5D9" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" onChange={(e) => search(e.target.value)} placeholder={searchBy} />
                </div>
            </div>
            <div className="actionsRight">
                <button className="btn" style={{ backgroundColor: "#52c41a", display: "flex" }} onClick={() => setBtnAdd(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "25px", marginRight: "10px" }} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    {btnName}
                </button>
            </div>
        </div>
    )
}

export default ActionsBar
