import logo from "../images/logo.svg";

function Header(){
    return(
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип"/>
            <a className="header__link" >Войти</a>
        </header>
    )
}
export default Header;