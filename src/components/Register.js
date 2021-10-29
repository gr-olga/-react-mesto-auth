import React from "react";
import {signIn, signUp} from './Auth'
import InfoTooltip from "./InfoTooltip";


function Register(props){

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function submitForm(e){
        e.preventDefault()
        props.onSignUp(password,email)
    }


    return (
        <div className="register">
            <div className="register__container">
                <h2 className="register__title">Регистрация</h2>
                <form className="register__form" onSubmit={submitForm}>
                    <label className="register__label">
                        <input className="register__input"
                               name="profileEmail" id="profile-email" type="email"
                               placeholder="Email"
                               required
                               onChange={handleChangeEmail}
                               value={email}>
                        </input>
                    </label>
                    <label className="register__label">
                        <input className="register__input"
                               name="profilePassword" id="profile-password" type="password"
                               placeholder="Пароль"
                               minLength="6"
                               maxLength="15"
                               required
                               onChange={handleChangePassword}
                               value={password}>
                        </input>
                    </label>
                    <button type="submit" className="register__btn">Зарегистрироваться</button>
                </form>
                <button type="button" className="register__leave-btn">Уже зарегистрированы? Войти</button>
            </div>
        </div>
    )
}
 export default Register