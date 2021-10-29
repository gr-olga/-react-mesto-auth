import logo from "../images/logo.svg";

function Header(props){
    return(
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип"/>
            <div className="header__box">
                <h3 className="header__email">{props.email}</h3>
            <a className="header__link" >Войти</a>
            </div>
        </header>
    )
}
export default Header;