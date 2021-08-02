const Genre = ({ item }) => {
    return (
        <div style={{ padding: "5px 10px", background: "lightgray", fontSize: "12px", borderRadius: "30px", color: "black", margin: "2px", cursor: "pointer", textTransform: "capitalize" }}>
            {item}
        </div>
    )
}

export default Genre
