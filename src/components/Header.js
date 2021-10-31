import logo from "../images/logo.svg";

function Header(props) {

    const linkText = props.isSignIn ? 'Войти' : 'Регистрация'
    const linkUrl = props.isSignIn ? 'signin' : 'signup'

    function logOut() {
        localStorage.removeItem('token')
    }

    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип"/>
            <div>
                {props.email ?
                    <div className="header__box">
                        <h3 className="header__email">{props.email}</h3>
                        <a className="header__link" href={linkUrl} onClick={logOut}>Выйти</a>
                    </div>
                    : <a className="header__link" href={linkUrl}>{linkText}</a>
                }
            </div>
        </header>
    )
}

export default Header;