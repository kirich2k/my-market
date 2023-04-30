import './Footer.css';
import logo from './img/logo_mini.jpg';
import img_VK from './img/vk.svg';
import img_Inst from './img/instagram.svg';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__logo">
                    <img src={logo} alt="Jewery"/>
                </div>
                <div className="footer__info info">
                    <ul className="info__title">Информация
                        <li><Link to='/error' className="info__link">Гарантия</Link> </li>
                        <li><Link to='/error' className="info__link">Вакансии</Link> </li>
                        <li><Link to='/error' className="info__link">О нас</Link> </li>
                    </ul>
                </div>
                <div className="footer__contact contact">
                    <span className="contact__title">Контакты</span>
                    <span className="contact__number">+7 978 000 00 00</span>
                    <a href="mailto:example@mail.ru" className="contact__mail">example@mail.ru</a>
                    <div className="contact__img">
                        {/*eslint-disable-next-line*//*Отключает варнинг*/}
                        <a href="https://vk.com" className="contact__img-vk" target="_blank">
                            <img src={img_VK} alt="Vkontakte" draggable="false" />
                        </a>
                        {/*eslint-disable-next-line*//*Отключает варнинг*/}
                        <a href="https://www.instagram.com" className="contact__img-instagram" target="_blank">
                            <img src={img_Inst} alt="Instagram" draggable="false" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;