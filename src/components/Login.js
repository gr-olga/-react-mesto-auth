import React from "react";


function Login() {
    return (
        <div className="enter">
            <div className="enter__container">
                <h2 className="enter__title">Вход</h2>
                <form className="enter__form">
                    <label className="enter__label">
                        <input className="enter__input"
                               name="profileEmail" id="profile-email" type="email"
                               placeholder="Email"
                               required
                               value={''}>
                        </input>
                    </label>
                    <label className="enter__label">
                        <input className="enter__input"
                               name="profilePassword" id="profile-password" type="text"
                               placeholder="Пароль"
                               minLength="6"
                               maxLength="15"
                               required
                               value={''}>
                        </input>
                    </label>
                    <button type="submit" className="enter__btn">Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login