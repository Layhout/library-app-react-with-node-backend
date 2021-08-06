const Footer = () => {
    const today = new Date();

    return (
        <footer style={{ textAlign: "center", padding: "20px", borderTop: "1px solid lightgray", marginTop: "20px" }}>
            <p>Copyright &copy; {today.getFullYear()}. All Right Reserved</p>
        </footer>
    )
}

export default Footer
