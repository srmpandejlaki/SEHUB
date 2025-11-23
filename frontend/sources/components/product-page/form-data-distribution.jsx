import React from "react";
import IconEditProduct from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";
import IconKalender from "../../assets/icon/mdi_calendar-outline.svg?react";
import IconPerson from "../../assets/icon/Vector-9.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";
import IconDistributor from "../../assets/icon/streamline-ultimate_delivery-package-person.svg?react";
import IconStatus from "../../assets/icon/fluent_status-12-regular.svg?react";
import IconBotol1 from "../../assets/icon/icon-park-outline_bottle-two.svg?react";
import IconBotol2 from "../../assets/icon/Frame 27.svg?react";
import IconKeterangan from "../../assets/icon/fluent_text-description-ltr-20-filled.svg?react";
import IconDropDown from "../../assets/icon/material-symbols_arrow-drop-down-rounded.svg?react";

function FormDataDistribution({ onCloseForm }) {
  return(
    <div className="form-data-distribution">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>Tambah Produk</p>
        </div>
        <IconCancel className="icon" onClick={onCloseForm} />
      </div>
      <form action="" className="main-form">
        <div className="left-side">
          <div className="inputan">
            <label htmlFor=""><IconKalender className="greenIcon" /> Hari/Tanggal</label>
            <input type="date" placeholder="Masukkan tanggal" />
          </div>
          <div className="inputan">
            <label htmlFor=""><IconPerson className="greenIcon" /> Nama Pemesan</label>
            <input type="text" placeholder="Masukkan nama pemesan" />
          </div>
          <div className="inputan">
            <label htmlFor=""><IconDistribution className="greenIcon" /> Metode Pengiriman</label>
            <select name="Metode Pengiriman" id="">
              <option value="Seho Sirop">Pengantaran Langsung</option>
              <option value="Seho Granule">Jasa Kurir</option>
              <option value="Seho Block">Ambil di Tempat</option>
              <option value="Seho Block">+ Metode Baru</option>
            </select>
          </div>
          <div className="inputan">
            <label htmlFor=""><IconDistributor className="greenIcon" /> Nama Pengirim</label>
            <input type="text" placeholder="Masukkan nama pengirim" />
          </div>
          <div className="inputan">
            <label htmlFor=""><IconStatus className="greenIcon" /> Status</label>
            <select name="Status" id="">
              <option value="Seho Sirop">Pengemasan</option>
              <option value="Seho Granule">Dalam Pengantaran</option>
              <option value="Seho Block">Sudah Diterima</option>
              <option value="Seho Block">+ Status Baru</option>
            </select>
          </div>
        </div>
        <div className="right-side">
          <div className="the-right-form">
            <div className="double-form">
              <div className="inputan-double">
                <label htmlFor=""><IconBotol1 className="greenIcon" /> Nama Produk</label>
                <select name="Nama Produk" id="">
                  <option value="Seho Sirop">Seho Sirop</option>
                  <option value="Seho Granule">Seho Granule</option>
                  <option value="Seho Block">Seho Block</option>
                  <option value="Seho Block">+ Produk Baru</option>
                </select>
                <p>+ Tambah Produk</p>
              </div>
              <div className="inputan">
                <label htmlFor=""><IconBotol2 className="greenIcon" /> Ukuran</label>
                <input type="text" placeholder="0" />
              </div>
            </div>
            <div className="detail-product">
              <div className="detail-container">
                <div className="head-detail">
                  <p>Detail Produk</p>
                  <IconDropDown className="blackIcon" /> 
                </div>
                <div className="display-detail">
                  <table className="products">
                    <tbody>
                      <tr>
                        <td>Seho Granule 250g <br/><span>25 Desember 2025</span></td>
                        <td className="counting">4</td>
                      </tr>
                      <tr>
                        <td>Seho Granule 250g <br/><span>4 Januari 2026</span></td>
                        <td className="counting">3</td>
                      </tr>
                      <tr className="total">
                        <td className="text-end">Total</td>
                        <td className="counting">7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="inputan">
              <label htmlFor=""><IconKeterangan className="greenIcon" /> Keterangan</label>
              <input type="text" placeholder="Ketik sesuatu.." />
            </div>
          </div>
          <div className="button">
            <button className="base-btn green">Simpan</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormDataDistribution;