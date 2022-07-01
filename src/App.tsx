import React, { lazy, Suspense } from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";

const Basket = lazy(() => import("./Pages/Basket/index"));
const Error = lazy(() => import("./Pages/Error/index"));
const Entrance = lazy(() => import("./Pages/Entrance/index"));
const Registration = lazy(() => import("./Pages/Registration/index"));
const Rings = lazy(() => import("./Pages/Product/Rings/index"));
const Earring = lazy(() => import("./Pages/Product/Earring/index"));
const Pendant = lazy(() => import("./Pages/Product/Pendant/index"));

const App: React.FC = () => {
    return (
        <div className="root__inner" id="root__inner">
            <Header />
            <article
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div className="main">
                    <Routes>
                        <Route
                            path="/error"
                            element={
                                <Suspense fallback={<h1>Загрузка...</h1>}>
                                    <Error />
                                </Suspense>
                            }
                        />
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/basket"
                            element={
                                <Suspense fallback={<h1>Загрузка...</h1>}>
                                    <Basket />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/entrance"
                            element={
                                <Suspense fallback={<h1>Загрузка...</h1>}>
                                    <Entrance />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/registration"
                            element={
                                <Suspense fallback={<h1>Загрузка...</h1>}>
                                    <Registration />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/rings"
                            element={
                                <Suspense fallback={<h1>Загрузка...</h1>}>
                                    <Rings />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/earring"
                            element={
                                <Suspense fallback={<h1>Загрузка...</h1>}>
                                    <Earring />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/pendant"
                            element={
                                <Suspense fallback={<h1>Загрузка...</h1>}>
                                    <Pendant />
                                </Suspense>
                            }
                        />
                    </Routes>
                </div>
            </article>
            <Footer />
        </div>
    );
};
export default App;
