import React from "react";
import ok from '../images/ok.png';
import notOk from '../images/notOk.png'

function InfoTooltip(props) {
    function toggleSing(props) {
        if (!props.isSuccess) {
            return notOk
        } else {
            return ok
        }
    }

    function toggleTitle(props) {
        if (!props.isSuccess) {
            return <h2 className="info__title">Что-то пошло не так! Попробуйте ещё раз.</h2>
        } else {
            return <h2 className="info__title">Вы успешно зарегистрировались!</h2>
        }
    }

    return (
        <div className={`info ${props.isOpen ? 'info_is-open' : ''}`}>
            <div className="info__box">
                <button className="popup__btn-close" type="button"
                    // onClick={closeForm}
                />
                <img src={props.isSuccess ? ok : notOk} className="info__img" alt="sing"/>
                {toggleTitle(props)}
            </div>
        </div>
    )
}

export default InfoTooltip