import './style.css';
import { Link } from "react-router-dom";
import Gears from "./img/gears.svg";

function Error() {
    return (
        <div className="main__error">
            <img className="main__error__img" src={Gears} alt="Gears" />
            <h1 className="main__error__title">
                Такой страницы не существует!
            </h1>
            <Link to={"/"} className="main__error__link">
                <span className="main__error__link__text">
                    Вернуться на главную
                </span>
            </Link>
        </div>
    );
};

export default Error