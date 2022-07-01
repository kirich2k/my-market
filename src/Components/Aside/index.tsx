import { Link } from "react-router-dom";
import "./Aside.css";

const Aside: React.FC =() => {
    return (
        <aside>
            <nav className="aside__nav">
                <Link to="/earring" className="aside__nav__link" id="earring">
                    Серьги
                </Link>
                <Link to="/rings" className="aside__nav__link" id="rings">
                    Кольца
                </Link>
                <Link to="/pendant" className="aside__nav__link" id="pendant">
                    Подвески
                </Link>
            </nav>
        </aside>
    );
};
export default Aside;
