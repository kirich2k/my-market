import { useEffect } from "react";
import "./Home.css";
import Aside from "../../Components/Aside";
import Card from "../../Components/Card";
import sale_1 from "./img/sale_1.jpg";
import sale_2 from "./img/sale_2.jpg";
import { Link } from "react-router-dom";
import CardHome from "../../Arrays/CardHome";

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="main__inner">
            <Aside />
            <div
                style={{
                    maxWidth: "900px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "15px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                }}
            >
                <div className="article__sale sale">
                    <div className="sale__box">
                        <div className="sale__img">
                            <img src={sale_1} alt="sale_1" draggable="false" />
                        </div>
                        <span className="sale__description">
                            Скидка 70% более чем на 1000 позиций ювелирных
                            изделий
                        </span>
                    </div>
                    <div className="sale__box">
                        <div
                            className="sale__img"
                            style={{ backgroundColor: "#e8e8ec" }}
                        >
                            <img src={sale_2} alt="sale_2" draggable="false" />
                        </div>
                        <span className="sale__description">
                            Финальная цена на изделия с бриллиантами
                        </span>
                    </div>
                </div>
                <div className="article__catalog catalog">
                    <span className="catalog__title">Каталог</span>
                    <div className="catalog__container">
                        {CardHome.map((i) => (
                            <div key={i.id} id={i.id} style={{width: '100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <Link
                                    to={"/" + i.id}
                                    className="catalog__inner"
                                >
                                    <Card name={i.name} id={i.id} img={i.img} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
