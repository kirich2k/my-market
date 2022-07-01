import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setActiveCategories,
    setActiveListLine,
    setListVisible,
    setFilters,
} from "../../../redux/slices/filterSlices";
import "../Product.css";
import Aside from "../../../Components/Aside";
import check from "../img/check.svg";
import plus from "../img/plus.svg";
import Loading from "../../../Components/PageLoading";
import Filter from "../../../Components/Filter";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../../redux/slices/cartSlices";
import { RootStore } from "../../../redux/store";

type itemsPendantProps = {
    id: number;
    img: string;
    name: string;
    price: number;
};

const ItemsPendant:React.FC<itemsPendantProps> = ({ id, img, name, price }) => {
    const [isAdded, setIsAdded] = useState(false);
    const dispatch = useDispatch();
    const empty = () => {};
    const added = () => {
        setIsAdded(true);
        const items = {
            id: id,
            img: img,
            name: name,
            price: price,
            count: 1,
        };
        dispatch(addItem(items));
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };
    const AddToBasket = () => {
        isAdded === false ? added() : empty();
    };
    return (
        <div className="items__container__product">
            <div className="items__container__product__inner">
                <div className="items__container__product__inner__img_inner">
                    <img
                        src={img}
                        alt={'"' + id + '"'}
                        className="items__container__product__inner__img"
                    />
                </div>
                <div className="items__container__product__inner__footer">
                    <span className="items__container__product__inner__footer__text">
                        {name}
                    </span>
                    <div className="items__container__product__inner__footer__price_container">
                        <span className="items__container__product__inner__footer__price_container__price_title">
                            Цена:
                        </span>
                        <div className="items__container__product__inner__footer__price_container__div">
                            <span className="items__container__product__inner__footer__price_container__div__price">
                                {" " + price} руб.
                            </span>
                            <img
                                className="items__container__product__inner__footer__price_container__div__btn"
                                src={isAdded ? check : plus}
                                onClick={() => AddToBasket()}
                                alt="basket"
                                draggable="false"
                            ></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type itemsProps = {
    id: number;
    img: string;
    name: string;
    price: number;
};

function Pendant() {
    const [items, setItems] = useState([]);
    const [Load, setLoad] = useState(false);
    const listVisible = Boolean(
        useSelector((state: RootStore) => state.filter.listVisible)
    );
    const activeCategories = Number(
        useSelector((state: RootStore) => state.filter.activeCategories)
    );
    const activeListLine = Number(
        useSelector((state: RootStore) => state.filter.activeListLine)
    );
    // const listVisible = useSelector((state) => state.filter.listVisible); //Ну или так, но по штучно
    const dispatch = useDispatch();
    const changeCategory = (id: number) => {
        dispatch(setActiveCategories(id));
    };
    const changeListVisible = (bool: boolean) => {
        dispatch(setListVisible(bool));
    };
    const changeActiveListLine = (i: number) => {
        dispatch(setActiveListLine(i));
    };
    const inpValue = useSelector((state: RootStore) => state.filter.inpValue);
    const navigate = useNavigate();
    const isMounted = React.useRef(false);
    const fetchPendant = () => {
        const categoryId =
            activeCategories !== -1 ? "category=" + activeCategories + "&" : "";
        const priceSortingFunc = () => {
            if (activeListLine === 0) {
                return "sortBy=price&order=asc";
            } else if (activeListLine === 1) {
                return "sortBy=price&order=desc";
            } else {
                return "";
            }
        };
        const priceSorting = !isNaN(activeListLine) ? priceSortingFunc() : "";
        const search = inpValue !== "" ? "search=" + inpValue + "&" : "";
        setLoad(false);
        axios
            .get(
                `https://62828536ed9edf7bd885eeb4.mockapi.io/items/pendants?${categoryId}${search}${priceSorting}`
            )
            .then((res) => {
                setItems(res.data);
                setLoad(true);
            });
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPendant();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategories, activeListLine, inpValue]);
    React.useEffect(() => {
        if (isMounted.current === true) {
            const queryString = qs.stringify({
                activeCategories: Number(activeCategories),
                activeListLine: Number(activeListLine),
            });
            const rule = "activeCategories=-1&activeListLine=0";
            if (queryString === rule) {
                navigate("");
            } else {
                navigate(`?${queryString}`);
            }
        }
        isMounted.current = true;
    }, [activeCategories, activeListLine, navigate]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const obj = {
                activeCategories: Number(params.activeCategories),
                activeListLine: Number(params.activeListLine),
            };
            dispatch(
                setFilters({
                    ...obj,
                })
            );
        }
    }, [dispatch]);
    return (
        <>
            <Aside />
            <div className="items">
                <Filter
                    propsChangeCategoryId={(id) => {
                        changeCategory(id);
                    }}
                    propsChangeListVisible={(bool) => {
                        changeListVisible(bool);
                    }}
                    propsChangeActiveListLine={(i) => {
                        changeActiveListLine(i);
                    }}
                    propsActiveCategories={activeCategories}
                    propsListVisible={listVisible}
                    propsActiveListLine={activeListLine}
                />
                <div className="items__container">
                    {Load ? (
                        items.length >= 1 ? (
                            items.map((i: itemsProps) => (
                                <ItemsPendant
                                    key={i.id}
                                    id={i.id}
                                    name={i.name}
                                    price={i.price}
                                    img={i.img}
                                />
                            ))
                        ) : (
                            <h1 style={{ width: "100%", textAlign: "center" }}>
                                Нету ничего
                            </h1>
                        )
                    ) : (
                        [...new Array(6)].map((_, i) => <Loading key={i} />)
                    )}
                </div>
            </div>
        </>
    );
}
export default Pendant;
