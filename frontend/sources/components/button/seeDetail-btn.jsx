import React from "react";
import { useTranslation } from "../../contexts/localContext";

function SeeDetailBtn() {
  const t = useTranslation();
  return (
    <div>
      <p className="base-btn black">{t('seeDetail')}</p>
    </div>
  );
}

export default SeeDetailBtn;