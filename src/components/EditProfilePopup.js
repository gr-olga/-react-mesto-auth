import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="profile" title="Редактировать профиль"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input name="profileName" id="profile-name" className="popup__input" type="text"
                       placeholder="Имя"
                       minLength="2"
                       maxLength="40"
                       required
                       value={name || ''}
                       onChange={handleNameChange}
                >
                </input>
                <span id="profile-name-error" className="popup__message-error"> </span>
            </label>
            <label className="popup__label">
                <input name="extra" id="extra" className="popup__input" type="text"
                       placeholder="О себе"
                       minLength="2"
                       maxLength="200"
                       required
                       value={description || ''}
                       onChange={handleDescriptionChange}
                >
                </input>
                <span id="extra-error" className="popup__message-error "> </span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;