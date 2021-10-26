import React from "react";
function PopupWithForm(props) {

    function closeForm(){
        props.onClose(props)
    }

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-open' : ''}`} >
            <div className={`popup__container popup__${props.name}`}>
                <button className="popup__btn-close" type="button"
                         onClick={closeForm}
                />
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={`${props.name}Form`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__save">Сохранить</button>
                </form>
            </div>
        </div>
    )

}
export default PopupWithForm