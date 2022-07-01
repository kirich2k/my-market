import React, { useLayoutEffect, useState } from "react";
import "./Header.css";
import logo from "./img/logo_mini.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../redux/store";

type PopupClick = MouseEvent & {
    path: Node[];
};

const Header: React.FC = () => {
    const [Can, setCan] = useState("");
    const [Active, setActive] = useState("");
    const [windowWidth] = useWindowSize();
    const root__inner = document.querySelector("#root__inner");
    const burgerMenuRef = React.useRef(null);
    const burgerBtnRef = React.useRef(null);
    const listenerRef = React.useRef<boolean>(false);
    const isMounted = React.useRef<boolean>(false)
    //отслеживание размера страницы
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            function Rule() {
                if (window.innerWidth >= 450) {
                    setActive("");
                    setCan("false");
                } else {
                    setCan("true");
                }
            }
            const enableListener = () => {
                listenerRef.current = true;
                window.addEventListener("resize", updateSize);
                window.addEventListener("resize", Rule);
            };
            enableListener();
            updateSize();
            Rule();
            return () => {
                if (listenerRef.current === true) {
                    window.removeEventListener("resize", updateSize);
                    window.removeEventListener("resize", Rule);
                    listenerRef.current = false;
                }
            };
        }, []);
        return size;
    }

    function btnToggle() {
        if (root__inner && windowWidth < 450) {
            Active === " _active" ? setActive("") : setActive(" _active");
            if (
                root__inner.classList.contains("_fixed") === false &&
                Active !== " _active" &&
                Can === "true"
            ) {
                root__inner.classList.add("_fixed");
            } else if (
                root__inner.classList.contains("_fixed") === true &&
                Active === " _active"
            ) {
                root__inner.classList.remove("_fixed");
            }
        } else {
            setActive("");
            if (root__inner && root__inner.classList.contains("_fixed") === true) {
                root__inner.classList.remove("_fixed");
            }
        }
    }
    React.useEffect(() => {
        const adaptiv = () => {
            if (window.innerWidth >= 450) {
                if (Active === "" && Can === "false" && root__inner) {
                    root__inner.classList.remove("_fixed");
                }
            }
        };
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as PopupClick;
            if (burgerBtnRef.current && burgerMenuRef.current) {
                if (
                    _event.path.includes(burgerBtnRef.current) === false &&
                    _event.path.includes(burgerMenuRef.current) === false
                ) {
                    setActive("");
                }
            }
        };
        document.body.addEventListener("click", handleClickOutside);
        window.addEventListener("resize", adaptiv);
        return () => {
            window.removeEventListener("resize", adaptiv);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { items, totalPrice } = useSelector((state: RootStore) => state.cart);

    React.useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(items);
            localStorage.setItem("cart", json);
        }
        isMounted.current = true;
    }, [items]);

    return (
        <>
            <header className="header">
                <div className="header__inner">
                    <Link to="/" className="header__inner__logo">
                        <img
                            src={logo}
                            alt="Jewery"
                            className="header__inner__logo__img"
                        />
                    </Link>
                    <nav className="header__inner__nav">
                        <Link to="/" className="header__inner__nav__link">
                            Главная
                        </Link>
                        <Link
                            to="/basket"
                            className="header__inner__nav__link"
                            id="basket"
                        >
                            {items.length === 0 ? "Корзина" : totalPrice + " ₽"}
                        </Link>
                        <Link
                            to="/entrance"
                            className="header__inner__nav__link"
                            id="login"
                        >
                            Вход
                        </Link>
                    </nav>
                    <nav
                        ref={burgerBtnRef}
                        className={"header__inner__burger" + Active}
                        id="burger"
                        onClick={() => btnToggle()}
                    >
                        <span className="header__inner__burger__line"></span>
                    </nav>
                    <nav
                        ref={burgerMenuRef}
                        className={"header__inner__menu" + Active}
                    >
                        <Link to="/" className="header__inner__menu__link">
                            Главная
                        </Link>
                        <Link
                            to='/basket'
                            className="header__inner__menu__link"
                            id="basket"
                        >
                            Корзина
                        </Link>
                        <Link
                            to="/entrance"
                            className="header__inner__menu__link"
                            id="login"
                        >
                            Вход
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;
