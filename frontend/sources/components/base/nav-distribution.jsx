import React from "react";
import { Link } from 'react-router-dom';
import IconLaporan from "../../assets/icon/lsicon_report-outline.svg?react";
import IconKembali from "../../assets/icon/lets-icons_back.svg?react";
import IconX from "../../assets/icon/mdi_cancel-bold.svg?react";

function NavDistribution({ onClose, openForm, to, disableAddButton = false }) {
  

  return(
    <div className="button nav-distribution">
      <div className="base-btn black">
        <IconLaporan className="icon whiteIcon" />Buat Laporan
      </div>
      <div 
        className={`base-btn ${disableAddButton ? 'disabled' : 'black'}`}
        onClick={handleAddClick}
        style={disableAddButton ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        title={disableAddButton ? "Tambahkan data barang masuk terlebih dahulu" : "Tambah Data"}
      >
        <IconTambah className="icon whiteIcon" />Tambah Data
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