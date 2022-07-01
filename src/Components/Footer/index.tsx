import './Footer.css';
import logo from './img/logo_mini.jpg';
import img_VK from './img/vk.svg';
import img_Inst from './img/instagram.svg';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer__inner">
                <div className="footer__inner__logo">
                    <img src={logo} alt="Jewery"/>
                </div>
                <div className="footer__inner__info">
                    <ul className="footer__inner__info__title">Информация
                        <li><Link to='/error' className="footer__inner__info__title__link">Гарантия</Link> </li>
                        <li><Link to='/error' className="footer__inner__info__title__link">Вакансии</Link> </li>
                        <li><Link to='/error' className="footer__inner__info__title__link">О нас</Link> </li>
                    </ul>
                </div>
                <div className="footer__inner__contact">
                    <span className="footer__inner__contact__title">Контакты</span>
                    <span className="footer__inner__contact__number">+7 978 000 00 00</span>
                    <a href="mailto:example@mail.ru" className="footer__inner__contact__mail">example@mail.ru</a>
                    <div className="footer__inner__contact__img">
                    {/*eslint-disable-next-line*//*Отключает варнинг*/}
                    <a href="https://vk.com" className="footer__inner__contact__img__link" target="_blank">
                        <img src={img_VK} alt="Vkontakte" draggable="false" />
                    </a>
                    {/*eslint-disable-next-line*//*Отключает варнинг*/}
                    <a href="https://www.instagram.com" className="footer__inner__contact__img__link" target="_blank">
                        <img src={img_Inst} alt="Instagram" draggable="false" />
                    </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;