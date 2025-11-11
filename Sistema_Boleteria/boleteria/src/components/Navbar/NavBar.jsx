import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {


    return(

        <nav>
            <Link to="/">Eventos</Link>
            <Link to="/compras">Compras</Link>
            <Link to="/login">Login</Link>
        </nav>
    )

}

export default NavBar;
