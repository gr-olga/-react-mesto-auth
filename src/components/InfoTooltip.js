import React from "react";
import ok from '../images/ok.png';
import notOk from '../images/notOk.png'

function InfoTooltip(props) {
    function toggleSing(props){
        if (!props){
            return notOk
        }
        else {
            return ok
        }
    }

    function toggleTitle(props){
        if (!props){
            return "Что-то пошло не так! Попробуйте ещё раз."
        }
        else {
            return "Вы успешно зарегистрировались!"
        }
    }


    return (
        <div className="info">
            <button className="popup__btn-close" type="button"
                // onClick={closeForm}
            />
            <div className="info__box">
                <img src={toggleSing(true)} className="info__img" alt="sing"/>
                <h2 className="info__title">
                    {toggleTitle(true)}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip