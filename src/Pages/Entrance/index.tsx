import { Link } from 'react-router-dom';
import './Entrance.css';

export default function Entrance() {
  return (
    <div className="entrance_container">
      <h2 className="entrance_container__title">Вход</h2>
      <form className="entrance_container__form" action="" method="post">
        <input type="text" name="login" id="login" placeholder='Введите логин' />
        <input type="password" name="password" id="password" placeholder='Введите пароль' />
        <button className='entrance_container__form__entry' type="submit">Вход</button>
        <Link className='entrance_container__form__question' to='/registration'><button className='entrance_container__form__question__button'>Зарегистрироваться</button></Link>
      </form>
    </div>
  )
}
