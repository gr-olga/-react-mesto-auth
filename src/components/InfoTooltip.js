import React from "react";

function InfoTooltip(){
    return(
  <div className="info">
      <button className="popup__btn-close" type="button"
              // onClick={closeForm}
      />
      <div className="info__box">
<img src="../images/ok.png"/>
      <h2>Вы успешно зарегистрировались!</h2>
      </div>
  </div>
    )
}
export default InfoTooltip