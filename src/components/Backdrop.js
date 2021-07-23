const Backdrop = ({ closeForm }) => {
    return (
        <div style={{ position: "fixed", width: "100%", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.75)", opacity: "0.5", top: "0", left: "0", zIndex: "1" }} onClick={() => closeForm(prev => !prev)}>
        </div>
    )
}

export default Backdrop
