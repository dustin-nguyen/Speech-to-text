import {Link} from "react-router-dom"
function Header() {
    
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <div>Duc Nguyen</div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
               </ul>
            </div>
        </nav>
    );
}
export default Header;