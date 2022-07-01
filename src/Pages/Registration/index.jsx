import React from 'react';
import { Link } from 'react-router-dom';
import './Registration.css'

const Registration = () => {
    return (
        <div className="registration_container">
            <h2 className="registration_container__title">Регистрация</h2>
            <form className="registration_container__form" action="" method="post">
                <input type="text" name="login" id="login" placeholder='Введите логин' />
                <input type="password" name="password" id="password" placeholder='Введите пароль' />
                <input type="password" name="password_check" id="password_check" placeholder='Повторите пароль' />
                <button className='registration_container__form__entry' type="submit">Зарегистрироваться</button>
                <Link className='registration_container__form__question' to='/entrance'><button className='registration_container__form__question__button'>Войти</button></Link>
            </form>
        </div>
    )
}

export default Registration;
