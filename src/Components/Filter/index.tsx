import React, { useRef } from "react";
import "./Filter.css";
import Search from "../Search";

type FilterProps = {
    propsActiveCategories: number;
    propsListVisible: boolean;
    propsActiveListLine: number;
    propsChangeCategoryId: (i: number) => void;
    propsChangeListVisible: (bool: boolean) => void;
    propsChangeActiveListLine: (n: number) => void;
};

const Filter: React.FC<FilterProps> = ({
    propsActiveCategories,
    propsListVisible,
    propsActiveListLine,
    propsChangeCategoryId,
    propsChangeListVisible,
    propsChangeActiveListLine,
}) => {
    const activeCategories = propsActiveCategories;
    const listLine = ["возрастанию цены", "убыванию цены"];
    const categories = ["Бриллиантовые", "Золтоые", "Серебряные", "Медные"];
    const changeList = () => {
        propsChangeListVisible(!propsListVisible);
    };
    const sortRef = useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!event.path.includes(sortRef.current)) {
                propsChangeListVisible(false);
            }
        };
        document.body.addEventListener("click", handleClickOutside);
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [propsChangeListVisible]);
    function empty() {}
    const delActiveCategories = () => {
        propsChangeCategoryId(-1);
    };
    return (
        <>
            {activeCategories === -1 && <Search />}
            <div className="filter__inner">
                <div className="filter__inner__categories">
                    {categories.map((n, id) => (
                        <button
                            key={id}
                            className={
                                activeCategories === id
                                    ? "filter__inner__categories__btn _active"
                                    : "filter__inner__categories__btn"
                            }
                            onClick={() => {
                                activeCategories === id
                                    ? empty()
                                    : propsChangeCategoryId(id);
                            }}
                        >
                            {n}
                            <span
                                className="filter__inner__categories__btn__close"
                                onClick={() => delActiveCategories()}
                            ></span>
                        </button>
                    ))}
                </div>
                <div
                    ref={sortRef}
                    className="filter__inner__sort"
                    onClick={changeList}
                >
                    Сортировать по:
                    <span className="filter__inner__sort__select">
                        {listLine[propsActiveListLine]}
                    </span>
                    {propsListVisible && (
                        <ul className="filter__inner__sort__list">
                            {listLine.map((name, i) => (
                                <li
                                    key={i}
                                    className={
                                        propsActiveListLine === i
                                            ? "filter__inner__sort__list__inner _active"
                                            : "filter__inner__sort__list__inner"
                                    }
                                    onClick={() => propsChangeActiveListLine(i)}
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default Filter;
