import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    function onCardClick(card) {
        props.onSelectedCard(card)
    }

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={currentUser.avatar} className="profile__avatar" alt="аватар"
                         onClick={props.onEditAvatar}/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
                    <p className="profile__extra">{currentUser.about}</p>
                </div>
                <button className="profile__add-card-button" type="button" onClick={props.onAddPlace}/>
            </section>
            <section className="cards-grid">
                {props.cards.map((card, _id) => {
                    return <Card {...card}
                                 onCardClick={onCardClick}
                                 onCardLike={props.onCardLike}
                                 onCardDelete={props.onCardDelete}
                                 key={card._id}/>
                })}
            </section>
        </main>
    )
}

export default Main;