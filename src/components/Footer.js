const Footer = () => {
    const year = new Date;

    return (
        <footer style={{ textAlign: "center", padding: "20px", borderTop: "1px solid lightgray", marginTop: "20px" }}>
            <p>Copyright &copy; {year.getFullYear()}. All Right Deserved</p>
        </footer>
    )
}

export default Footer
