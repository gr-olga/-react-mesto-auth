
function ImagePopup(props){

    return(
        <div className={`popup popup_card ${props.card ? 'popup_is-open' : ''}`}  >
        <div className="popup__card-container">
            <button className="popup__btn-close popup__card-btn-close" type="button" onClick={props.onClose}/>
            <img className="popup__img" alt={props.card?.name} src={props.card?.link}/>
            <h2 className="popup__image-title">{props.card?.name}</h2>
        </div>
    </div>
    )
}
export default ImagePopup;