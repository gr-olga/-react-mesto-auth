import React from "react";

function Login(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function submitForm(e) {
        e.preventDefault()
        props.onSighIn(password, email)
    }

    return (
        <div className="enter">
            <div className="enter__container">
                <h2 className="enter__title">Вход</h2>
                <form className="enter__form" onSubmit={submitForm}>
                    <label className="enter__label">
                        <input className="enter__input"
                               name="profileEmail" id="profile-email" type="email"
                               placeholder="Email"
                               required
                               onChange={handleChangeEmail}
                               value={email}>
                        </input>
                    </label>
                    <label className="enter__label">
                        <input className="enter__input"
                               name="profilePassword" id="profile-password" type="password"
                               placeholder="Пароль"
                               minLength="6"
                               maxLength="15"
                               required
                               onChange={handleChangePassword}
                               value={password}>
                        </input>
                    </label>
                    <button type="submit" className="enter__btn">Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login