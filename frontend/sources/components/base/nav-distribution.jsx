import React from "react";
import { Link } from 'react-router-dom';
import IconLaporan from "../../assets/icon/lsicon_report-outline.svg?react";
import IconTambah from "../../assets/icon/mdi_add-bold.svg?react";
import IconKembali from "../../assets/icon/lets-icons_back.svg?react";
import IconX from "../../assets/icon/mdi_cancel-bold.svg?react";

function NavDistribution({ onClose, openForm, to }) {
  return(
    <div className="button nav-distribution">
      <div className="base-btn black">
        <IconLaporan className="icon whiteIcon" />
        <p>Buat Laporan</p>
      </div>
      <div className="base-btn black" onClick={openForm}>
        <IconTambah className="icon whiteIcon" />
        <p>Tambah Data</p>
      </div>
      <div className="base-btn black">
        <Link to={to} >
          <IconKembali className="icon whiteIcon" />Kembali
        </Link>
      </div>
      <IconX className="blackIcon close-button" onClick={onClose} />
    </div>
  );
}

export default NavDistribution;