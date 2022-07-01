import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { celarItems } from "../../redux/slices/cartSlices";
import { RootStore } from "../../redux/store";
import "./Basket.css";
import basket from "./img/cart.svg";
import trashcan from "./img/trashcan.svg";
import Items from "./Items";

const Basket: React.FC = () => {
    const items = useSelector((state: RootStore) => state.cart.items);
    const totalPrice = useSelector((state: RootStore) => state.cart.totalPrice);
    const dispatch = useDispatch();
    const ClearCart = () => {
        if (window.confirm('Вы действительно хотите очистить корзину?')) {
            dispatch(celarItems());
        }
    }
    return (
        <div className="basket_aside">
            <div className="basket_aside__container">
                <div className="basket_aside__container__header">
                    <h2 className="basket_aside__container__header__title">
                        <img src={basket} alt="i" />
                        Корзина
                    </h2>
                    {items.length !== 0 && (
                        <div className="basket_aside__container__header__btn_clearCart" onClick={() => ClearCart()}>
                            <img src={trashcan} alt="del" draggable="false" />
                            <div
                                className="basket_aside__container__header__btn_clearCart__title"
                            >
                                Очистить корзину
                            </div>
                        </div>
                    )}
                </div>
                {items.length !== 0 ? (
                    items.map((i, a) => (
                        <Items
                            key={a}
                            img={i.img}
                            id={i.id}
                            name={i.name}
                            price={i.price}
                            count={i.count}
                        />
                    ))
                ) : (
                    <div className="basket_aside__container__empty">
                        <h1 className="basket_aside__container__empty__title">
                            В корзине нету ничего
                        </h1>
                        <Link
                            to="/"
                            className="basket_aside__container__empty__btn"
                        >
                            Вернуться на главную
                        </Link>
                    </div>
                )}
                <div className="basket_aside__container__footer">
                    <div className="basket_aside__container__footer__inner">
                        <div className="basket_aside__container__footer__inner__price">
                            <span className="basket_aside__container__footer__inner__price__text">
                                Итого:
                            </span>
                            <span className="basket_aside__container__footer__inner__price__space"></span>
                            <div className="basket_aside__container__footer__inner__price__total_price">
                                {totalPrice + " руб."}
                            </div>
                        </div>
                        {items.length !== 0 && (
                            <button className="basket_aside__container__footer__inner__btn_pay" onClick={() => alert('Продолжение следует')}
                            >
                                Оформить заказ
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Basket;
