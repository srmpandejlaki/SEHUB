import React from "react";
import IconIndonesia from "../../assets/icon/indonesia.png";
import IconEnglish from "../../assets/icon/inggris.png";
import IconFrance from "../../assets/icon/france.png";
import IconLanguages from "../../assets/icon/meteor-icons_language.svg?react";

function LanguageSetting() {
  return(
    <div className="languages-setting">
      <div className="text">
        <div className="title">
          <IconLanguages className="icon greenIcon" />
          <h4>BAHASA</h4>
        </div>
        <p>Bahasa yang digunakan saat ini :</p>
      </div>
      <div className="icon-languages">
        <div className="language">
          <img src={IconIndonesia} alt="" />
          <p>Indonesia</p>
        </div>
        <div className="language">
          <img src={IconEnglish} alt="" />
          <p>English</p>
        </div>
        <div className="language">
          <img src={IconFrance} alt="" />
          <p>France</p>
        </div>
      </div>
    </div>
  );
}

export default LanguageSetting;