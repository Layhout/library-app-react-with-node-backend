import "./Navbar.css";
import { Link, useLocation, useHistory } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const history = useHistory();

    const links = [
        {
            name: "Books",
            to: "/",
        },
        {
            name: "Visitors",
            to: "/visitors",
        },
        {
            name: "Cards",
            to: "/cards",
        },
        {
            name: "Statistics",
            to: "/statistics",
        },
    ]

    const handleClick = () => {
        history.push("/")
    }

    return (
        <div className="navbar">
            <div className="navbar-title" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="logo" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <h3 style={{ fontWeight: "300" }}>No Book <span style={{ color: "#3DA5D9", fontWeight: "bold" }}>No future</span> </h3>
            </div>
            <div className="navbar-menu">
                <ul>
                    {links.map((link, k) => (
                        <li key={k}><Link to={link.to} style={location.pathname === link.to ? { borderBottom: "2px solid #3DA5D9", color: "#3DA5D9" } : { borderBottom: "none" }}>{link.name}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
