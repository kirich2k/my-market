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

interface ItemsRingsProps {
    id: number;
    img: string;
    name: string;
    price: number;
}

const ItemsRings: React.FC<ItemsRingsProps> = ({ id, img, name, price }) => {
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
        <div className="items__product product">
            <div className="product__inner">
                <div className="product__img-inner">
                    <img
                        src={img}
                        alt={'"' + id + '"'}
                    />
                </div>
                <div className="product__footer product-footer">
                    <span className="product-footer__text">
                        {name}
                    </span>
                    <div className="product-footer__price price-container">
                        <span className="price-container__title">
                            Цена:
                        </span>
                        <div className="price-container__div">
                            <span className="price-container__price">
                                {" " + price} руб.
                            </span>
                            <img
                                className="price-container__btn"
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

function Rings() {
    const [items, setItems] = useState<ItemsRingsProps[]>([]);
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
    const inpValue = String(
        useSelector((state: RootStore) => state.filter.inpValue)
    );
    const navigate = useNavigate();
    const isMounted = React.useRef(false);
    const fetchRings = async () => {
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
        try {
            const res = await axios.get(
                `https://62828536ed9edf7bd885eeb4.mockapi.io/items/rings?${categoryId}${search}${priceSorting}`
            );
            setItems(res.data);
            setLoad(true);
        } catch (error) {
            console.log("error", error);
            setLoad(true);
            alert("Произошла ошибка при загрузке товара. Попробуйте позже.");
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchRings();
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
                    propsChangeCategoryId={(id: number) => {
                        changeCategory(id);
                    }}
                    propsChangeListVisible={(bool: boolean) => {
                        changeListVisible(bool);
                    }}
                    propsChangeActiveListLine={(i: number) => {
                        changeActiveListLine(i);
                    }}
                    propsActiveCategories={activeCategories}
                    propsListVisible={listVisible}
                    propsActiveListLine={activeListLine}
                />
                <div className="items__container">
                    {Load ? (
                        items.length >= 1 ? (
                            items.map((i: ItemsRingsProps) => (
                                <ItemsRings
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
export default Rings;
