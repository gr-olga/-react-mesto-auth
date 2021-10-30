import React from "react";
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
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import {signUp} from "./Auth";

function App() {


    const [isLogged, setLogged] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


// function checkToken(jwt) {
//     Auth.getLoginStatus(jwt)
//         .then((res) => {
//             setLogged(true)
//             setEmail(res.data.email)
//         })
//         .catch(err => console.log(err))
// }

    const [user, setUser] = React.useState({})

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)

    const [selectedCard, setSelectedCard] = React.useState(undefined)

    React.useEffect(() => {
        api.getInitialProfile().then((info) => {
            setUser(info);
        }).catch((err) => console.log(err))
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
        signUp(password, email)
            .then(() => {
                setInfoTooltipOpen(true)
                setInfoTooltipSuccess(true)
            })
            .catch(()=>{
                setInfoTooltipOpen(true)
                setInfoTooltipSuccess(false)
            })
    }



    return (
        <div className="App">
            <div className="body">
                <div className="page">
                    <Header email={email}
                    />
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
                                </ProtectedRoute>
                                <Route path="/signup">
                                    <Register onSignUp={handleSignUp}/>
                                </Route>
                                <Route path="/signin" component={Login}/>
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

export default App;


