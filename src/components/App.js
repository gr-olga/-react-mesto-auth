import React, {useEffect, useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import {getLoginStatus, signIn, signUp} from "./Auth";

function App(props) {
    const [isLogged, setLogged] = useState(false)
    const [email, setEmail] = useState('')
    const [user, setUser] = useState({})
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(undefined)

    useEffect(() => {
        tokenCheck();
        api.getInitialProfile()
            .then((info) => setUser(info))
            .catch((err) => console.log(err))
    }, [])

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setEditAvatarPopupOpen(false)
        setSelectedCard(undefined)
        setInfoTooltipOpen(false)
    }

    function handleUpdateUser(obj) {
        api.updateUserProfile(obj).then((info) => {
            setUser(info)
        }).then(() => closeAllPopups())
    }

    function handleUpdateAvatar(obj) {
        api.updateProfileAvatar(obj.avatar).then((info) => {
            setUser(info)
        }).then(() => closeAllPopups())
            .catch((err) => console.log(err))
    }

    const currentUser = React.useContext(CurrentUserContext);
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getInitialCards().then((card) => {
            setCards(card)
        }).catch((err) => console.log(err))
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            api.updateLikes(card._id,).then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            }).catch((err) => console.log(err))
        } else {
            api.deleteLikes(card._id,).then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            }).catch((err) => console.log(err))
        }

    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter((item) => card._id !== item._id)
            setCards(newCards)
        }).catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(obj) {
        api.addCard(obj).then((newCard) => {
            setCards([newCard, ...cards]);
        }).then(() => closeAllPopups())
            .catch((err) => console.log(err))
    }

    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
    const [isInfoTooltipSuccess, setInfoTooltipSuccess] = React.useState(true)

    function handleSignUp(password, email) {
        return signUp(password, email)
            .then(() => {
                setInfoTooltipOpen(true)
                setInfoTooltipSuccess(true)
                setLogged(true)
            })
            .catch(() => {
                setInfoTooltipOpen(true)
                setInfoTooltipSuccess(false)
            })
    }

    function handleSignIn(password, email) {
        return signIn(password, email)
            .then(data => {
                localStorage.setItem('token', data.token)
                setLogged(true)
                return tokenCheck()
            })
            .then(() => {
                props.history.push('/');
            })
    }

    function tokenCheck() {
        const token = localStorage.getItem('token')
        if (!token) return Promise.resolve();
        return getLoginStatus(token)
            .then(({data}) => {
                setLogged(true)
                setEmail(data.email)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="App">
            <div className="body">
                <div className="page">
                    <CurrentUserContext.Provider value={user}>
                        <BrowserRouter>
                            <Switch>
                                <ProtectedRoute
                                    isLogged={isLogged}
                                    component={Main}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onSelectedCard={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    exact path="/">
                                    <Header email={email} isSignIn={false}/>
                                </ProtectedRoute>
                                <Route path="/signup">
                                    <Header email={email} isSignIn={true}/>
                                    <Register onSignUp={handleSignUp}/>
                                </Route>
                                <Route path="/signin">
                                    <Header email={email} isSignIn={false}/>
                                    <Login onSighIn={handleSignIn}/>
                                </Route>
                            </Switch>
                        </BrowserRouter>
                    </CurrentUserContext.Provider>
                    <Footer/>
                </div>
                <section>
                    <InfoTooltip
                        isOpen={isInfoTooltipOpen}
                        isSuccess={isInfoTooltipSuccess}
                        onClose={closeAllPopups}
                    />
                    <CurrentUserContext.Provider value={user}>
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUxser={handleUpdateUser}

                        />
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlaceSubmit}
                        >

                        </AddPlacePopup>
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}
                        >
                        </EditAvatarPopup>
                    </CurrentUserContext.Provider>
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                </section>

            </div>
        </div>
    )
}

export default withRouter(App);


