import React from "react";
import iconIndonesia from "../../assets/icon/indonesia.png";
import iconEnglish from "../../assets/icon/english.png";
import iconFrance from "../../assets/icon/france.png";


function LanguageSetting() {
  return(
    <div className="languages-setting">
      <div className="text">
        <h4>BAHASA</h4>
        <p>Bahasa yang digunakan saat ini :</p>
      </div>
      <div className="icon-languages">
        <div className="language">
          <img src={iconIndonesia} alt="" />
          <p>Indonesia</p>
        </div>
        <div className="language">
          <img src={iconEnglish} alt="" />
          <p>English</p>
        </div>
        <div className="language">
          <img src={iconFrance} alt="" />
          <p>France</p>
        </div>
      </div>
    </div>
  );
}

export default LanguageSetting;