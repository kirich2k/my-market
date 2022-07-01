import React from "react";
import { useDispatch } from "react-redux";
import "./Basket.css";
import del from "./img/trashcan_red.svg";
import plus from "./img/plus.svg";
import minus from "./img/minus.svg";
import { addItem, minusItem, removeItem } from "../../redux/slices/cartSlices";
import clsx from "clsx";

type itemsProps = {
    id: number;
    img: string;
    name: string;
    price: number;
    count: number;
};

const Items: React.FC<itemsProps> = ({ img, id, name, count, price }) => {
    const dispatch = useDispatch();
    const OnClickPlus = () => {
        dispatch(addItem({ img, id, name, count, price }));
    };
    const OnClickMinus = () => {
        dispatch(minusItem({ id, name, price }));
    };
    const OnClickRemove = () => {
        if (window.confirm("Вы действительно хотите удалить?")) {
            dispatch(removeItem({ id, name, price }));
        }
    };
    return (
        <div className="basket_aside__container__product">
            <div className="basket_aside__container__product__inner">
                <div className="basket_aside__container__product__inner__img_inner">
                    <img
                        src={img}
                        alt={'"' + id + '"'}
                        className="basket_aside__container__product__inner__img"
                    />
                </div>
                <div className="basket_aside__container__product__inner__description">
                    <span className="basket_aside__container__product__inner__description__title">
                        {name}
                    </span>
                    <div className="basket_aside__container__product__inner__description__count">
                        <img
                            className={clsx({
                                _disable: count <= 1,
                            })}
                            src={minus}
                            alt="-"
                            draggable="false"
                            onClick={() => OnClickMinus()}
                        />
                        <span>{count}</span>
                        <img
                            src={plus}
                            alt="+"
                            draggable="false"
                            onClick={() => OnClickPlus()}
                        />
                    </div>
                    <div className="basket_aside__container__product__inner__description__price_container">
                        <div className="basket_aside__container__product__inner__description__price_container__space"></div>
                        <div className="basket_aside__container__product__inner__description__price_container__price">
                            {" " + price} руб.
                        </div>
                        <img
                            className="basket_aside__container__product__inner__description__price_container__btn_del"
                            src={del}
                            onClick={() => OnClickRemove()}
                            alt="basket"
                            draggable="false"
                        ></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Items;
