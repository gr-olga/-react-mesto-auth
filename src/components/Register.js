import React from "react";

function Register(){
    return (
        <div className="register">
            <div className="register__container">
                <h2 className="register__title">Регистрация</h2>
                <form className="register__form">
                    <label className="register__label">
                        <input className="register__input"
                               name="profileEmail" id="profile-email" type="email"
                               placeholder="Email"
                               required
                               value={''}>
                        </input>
                    </label>
                    <label className="register__label">
                        <input className="register__input"
                               name="profilePassword" id="profile-password" type="text"
                               placeholder="Пароль"
                               minLength="6"
                               maxLength="15"
                               required
                               value={''}>
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