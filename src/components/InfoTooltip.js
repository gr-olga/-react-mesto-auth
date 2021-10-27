import React from "react";
import ok from '../images/ok.png'

function InfoTooltip() {
    return (
        <div className="info">
            <button className="popup__btn-close" type="button"
                // onClick={closeForm}
            />
            <div className="info__box">
                <img src={ok} className="info__img"/>
                <h2 className="info__title">Вы успешно зарегистрировались!</h2>
            </div>
        </div>
    )
}

export default InfoTooltip