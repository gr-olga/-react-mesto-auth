import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [link, setLink] = React.useState('')
    const [name, setName] = React.useState('')

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props]);

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: name,
            link: link,
        });
    }

    return (
        <PopupWithForm name="card"
                       title="Новое место"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input name="cardTitle" id="card-title" className="popup__input" type="text"
                       placeholder="Название"
                       minLength="2" maxLength="30"
                       required
                       value={name}
                       onChange={handleNameChange}
                />
                <span id="card-title-error" className="popup__message-error">  </span>
            </label>
            <label className="popup__label">
                <input name="link" id="link" className="popup__input" type="url"
                       placeholder="Cсылка на картинку"
                       required
                       value={link}
                       onChange={handleLinkChange}
                />
                <span id="link-error" className="popup__message-error"> </span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;