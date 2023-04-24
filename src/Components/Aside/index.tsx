import { Link } from "react-router-dom";
import "./Aside.css";

const Aside: React.FC =() => {
    return (
        <aside className="aside">
            <nav className="aside__nav nav">
                <Link to="/earring" className="nav__link" id="earring">
                    Серьги
                </Link>
                <Link to="/rings" className="nav__link" id="rings">
                    Кольца
                </Link>
                <Link to="/pendant" className="nav__link" id="pendant">
                    Подвески
                </Link>
            </nav>
        </aside>
    );
};
export default Aside;
