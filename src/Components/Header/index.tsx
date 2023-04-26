import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Header.css";
import styled, { keyframes } from "styled-components";
import logo from "./img/logo_mini.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../redux/store";
import ImgPeople from "./img/people.svg";
import ImgCart from "./img/cart.svg";

// type PopupClick = MouseEvent & {
//     path: Node[];
// };

    //---Styled Components---*/
    const opacity = keyframes`
    0% {
        opacity: 0;
    }
    25% {
        opacity: 0.25;
    }
    50% {
        opacity: 0.5;
    }
    75% {
        opacity: 0.75;
    }
    100% {
        opacity: 1;
    }
`;
    const reversOpacity = keyframes`
    0% {
        opacity: 1;
    }

    25% {
        opacity: 0.75;
    }

    50% {
        opacity: 0.5;
    }

    75% {
        opacity: 0.25;
    }

    100% {
        opacity: 0;
    }
`;

    const StyleHeader = styled.header`
        z-index: 100;
        top: 0px;
        display: flex;
        justify-content: center;
        background-color: white;
        box-shadow: 0px 1px 5px #4a4a4a;
    `;
    const HeaderInner = styled.div`
        max-width: 1200px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        padding: 5px 20px;
    `;
    const LogoImg = styled.img`
        max-width: 100px;
    `;
    const Nav = styled.nav`
        max-width: 250px;
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 450px) {
            display: none !important;
        }
    `;
    const NavLink = styled.span`
        position: relative;
        display: inline-flex;
        flex-wrap: nowrap;
        transition: all 2s linear;
        /* cursor: pointer; */
        &#basket,
        &#login {
            margin-left: 28px;
        }
        &#basket::before {
            content: "";
            position: absolute;
            left: -30px;
            top: -2px;
            width: 28px;
            height: 17px;
            background-image: url(${ImgCart});
            background-position: center;
            background-repeat: no-repeat;
            background-size: 20px;
        }
        &#login::before {
            content: "";
            position: absolute;
            left: -30px;
            top: 0;
            width: 28px;
            height: 17px;
            background-image: url(${ImgPeople});
            background-position: center;
            background-repeat: no-repeat;
            background-size: 20px;
        }
        &:after {
            content: "";
            width: 100%;
            position: absolute;
            margin-top: 5px;
            height: 1px;
            left: 0;
            bottom: -3px;
            background-color: red;
            transition: 0.3s;
            transform: scaleX(0);
        }
        &:hover:after {
            transform: scaleX(1);
        }
    `;
    const Burger = styled.nav`
        width: 25px;
        height: 17px;
        position: relative;
        display: none;
        align-items: center;
        justify-content: center;
        content: "";
        cursor: pointer;
        &.-active {
            transition: all 0.2s linear;
            &:before {
                transition: all 0.2s linear;
                transform: rotate(45deg);
                top: 8px;
            }
            &:after {
                transition: all 0.2s linear;
                transform: rotate(-45deg);
                bottom: 7px;
            }
        }
        &:before {
            transition: all 0.2s linear;
            width: 100%;
            height: 2px;
            top: 0px;
            left: 0px;
            content: "";
            position: absolute;
            background-color: black;
        }
        &:after {
            transition: all 0.2s linear;
            width: 100%;
            height: 2px;
            bottom: 0px;
            left: 0px;
            content: "";
            position: absolute;
            background-color: black;
        }
        @media (max-width: 450px) {
            display: inline-flex !important;
        }
    `;
    const BurgerLine = styled.span`
        animation: ${opacity} 0.2s linear;
        width: 100%;
        height: 2px;
        content: "";
        background-color: black;
        &.-active {
            animation: ${reversOpacity} 0.2s linear forwards;
        }
    `;
    const Menu = styled.nav`
        width: 100%;
        position: absolute;
        top: 75px;
        left: 0px;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background-color: #ffffff;
        z-index: 100;
        border: 1px solid #d4d4d4;
        &.-active {
            display: flex;
            animation: opacity 0.2s linear;
        }
    `;
    const MenuLink = styled.span`
        position: relative;
        margin: 10px 0px;
        padding: 5px 0px;
        &:after {
            content: "";
            width: 100%;
            position: absolute;
            margin-top: 5px;
            height: 1px;
            left: 0;
            bottom: 2px;
            background-color: red;
            transition: 0.3s;
            transform: scaleX(0);
        }
        &:hover:after {
            transform: scaleX(1);
        }
    `;

const Header: React.FC = () => {
    const [Can, setCan] = useState("");
    const [Active, setActive] = useState("");
    const [windowWidth] = useWindowSize();
    const root__inner = document.querySelector("#root__inner");
    const burgerMenuRef = React.useRef(null);
    const burgerBtnRef = React.useRef(null);
    const listenerRef = React.useRef<boolean>(false);
    const isMounted = React.useRef<boolean>(false);
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
            Active === " -active" ? setActive("") : setActive(" -active");
            if (
                root__inner.classList.contains("-fixed") === false &&
                Active !== " -active" &&
                Can === "true"
            ) {
                root__inner.classList.add("-fixed");
            } else if (
                root__inner.classList.contains("-fixed") === true &&
                Active === " -active"
            ) {
                root__inner.classList.remove("-fixed");
            }
        } else {
            setActive("");
            if (
                root__inner &&
                root__inner.classList.contains("-fixed") === true
            ) {
                root__inner.classList.remove("-fixed");
            }
        }
    }
    useEffect(() => {
        const adaptiv = () => {
            if (window.innerWidth >= 450) {
                if (Active === "" && Can === "false" && root__inner) {
                    root__inner.classList.remove("-fixed");
                }
            }
        };
        // const handleClickOutside = (event: MouseEvent) => {
        //     const _event = event as PopupClick;
        //     console.log(burgerBtnRef.current);
        //     if (burgerBtnRef.current && burgerMenuRef.current) {
        //         if (
        //             _event.path.includes(burgerBtnRef.current) === false &&
        //             _event.path.includes(burgerMenuRef.current) === false
        //         ) {
        //             setActive("");
        //         }
        //     }
        // };
        // document.body.addEventListener("click", handleClickOutside);
        window.addEventListener("resize", adaptiv);
        return () => {
            window.removeEventListener("resize", adaptiv);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { items, totalPrice } = useSelector((state: RootStore) => state.cart);

    useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(items);
            localStorage.setItem("cart", json);
        }
        isMounted.current = true;
    }, [items]);
    return (
        <>
            <StyleHeader>
                <HeaderInner className="header__inner">
                    <Link to="/" className="header__logo logo">
                        <LogoImg
                            src={logo}
                            alt="Jewery"
                            className="logo__img"
                        />
                    </Link>
                    <Nav className="header__nav nav">
                        <Link to="/">
                            <NavLink className="nav__link">Главная</NavLink>
                        </Link>
                        <Link to="/basket">
                            <NavLink className="nav__link" id="basket">
                                {items.length === 0
                                    ? "Корзина"
                                    : totalPrice + " ₽"}
                            </NavLink>
                        </Link>
                        <Link to="/entrance">
                            <NavLink className="nav__link" id="login">
                                Вход
                            </NavLink>
                        </Link>
                    </Nav>
                    <Burger
                        ref={burgerBtnRef}
                        className={"header__burger burger" + Active}
                        id="burger"
                        onClick={() => btnToggle()}
                    >
                        <BurgerLine
                            className={"burger__line" + Active}
                        ></BurgerLine>
                    </Burger>
                    <Menu
                        ref={burgerMenuRef}
                        className={"header__menu menu" + Active}
                    >
                        <MenuLink>
                            <Link to="/" className="menu__link">
                                Главная
                            </Link>
                        </MenuLink>
                        <MenuLink>
                            <Link
                                to="/basket"
                                className="menu__link"
                                id="basket"
                            >
                                Корзина
                            </Link>
                        </MenuLink>
                        <MenuLink>
                            <Link
                                to="/entrance"
                                className="menu__link"
                                id="login"
                            >
                                Вход
                            </Link>
                        </MenuLink>
                    </Menu>
                </HeaderInner>
            </StyleHeader>
        </>
    );
};

export default Header;
