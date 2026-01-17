import React, { useState  } from "react";
import IconBotol2 from "../../assets/icon/Frame 27.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";
import IconStatus from "../../assets/icon/fluent_status-12-regular.svg?react";
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconDelete from "../../assets/icon/material-symbols_delete.svg?react";
import { useTranslation, useDynamicTranslation } from "../../contexts/localContext";

function MasterData({ 
  existingSize, existingKemasan, existingNamaProduk, 
  createSize, createKemasan, createNamaProduk,
  existingMetodePengiriman, existingStatusPengiriman,
  createMetodePengiriman, createStatusPengiriman,
  onEditNamaProduk, onDeleteNamaProduk,
  onEditSize, onDeleteSize,
  onEditKemasan, onDeleteKemasan,
  onEditMetode, onDeleteMetode,
  onEditStatus, onDeleteStatus
}) {
  const t = useTranslation();
  const dynamicT = useDynamicTranslation();
  const [newSizeName, setNewSizeName] = useState("");
  const [newKemasanName, setNewKemasanName] = useState("");
  const [newNamaProdukName, setNewNamaProdukName] = useState("");
  const [isSubmittingSize, setIsSubmittingSize] = useState(false);
  const [isSubmittingKemasan, setIsSubmittingKemasan] = useState(false);
  const [isSubmittingNamaProduk, setIsSubmittingNamaProduk] = useState(false);

  const [newMetodePengirimanName, setNewMetodePengirimanName] = useState("");
  const [newStatusPengirimanName, setNewStatusPengirimanName] = useState("");
  const [isSubmittingMetodePengiriman, setIsSubmittingMetodePengiriman] = useState(false);
  const [isSubmittingStatusPengiriman, setIsSubmittingStatusPengiriman] = useState(false);

  const handleAddSize = async (e) => {
    e.preventDefault();
    if (!newSizeName.trim()) {
      alert(t('sizeEmpty'));
      return;
    }
    
    setIsSubmittingSize(true);
    await createSize(newSizeName.trim());
    setNewSizeName("");
    setIsSubmittingSize(false);
  };

  const handleAddKemasan = async (e) => {
    e.preventDefault();
    if (!newKemasanName.trim()) {
      alert(t('packagingEmpty'));
      return;
    }
    
    setIsSubmittingKemasan(true);
    await createKemasan(newKemasanName.trim());
    setNewKemasanName("");
    setIsSubmittingKemasan(false);
  };

  const handleAddNamaProduk = async (e) => {
    e.preventDefault();
    if (!newNamaProdukName.trim()) {
      alert(t('productNameEmpty'));
      return;
    }
    
    setIsSubmittingNamaProduk(true);
    await createNamaProduk(newNamaProdukName.trim());
    setNewNamaProdukName("");
    setIsSubmittingNamaProduk(false);
  };

  const handleAddMetodePengiriman = async (e) => {
    e.preventDefault();
    if (!newMetodePengirimanName.trim()) {
      alert(t('shippingMethodEmpty'));
      return;
    }
    
    setIsSubmittingMetodePengiriman(true);
    await createMetodePengiriman(newMetodePengirimanName.trim());
    setNewMetodePengirimanName("");
    setIsSubmittingMetodePengiriman(false);
  };

  const handleAddStatusPengiriman = async (e) => {
    e.preventDefault();
    if (!newStatusPengirimanName.trim()) {
      alert(t('shippingStatusEmpty'));
      return;
    }
    
    setIsSubmittingStatusPengiriman(true);
    await createStatusPengiriman(newStatusPengirimanName.trim());
    setNewStatusPengirimanName("");
    setIsSubmittingStatusPengiriman(false);
  };

  return (
    <div className="master-data">
      <div className="pengantar">
        <h3>{t('masterDataSettings')}</h3>
      </div>
      <div className="main-data-setting">
        {/* Nama Produk - hardcoded untuk saat ini */}
        <div className="nama-produk">
          <p className="title"><IconBotol2 className="greenIcon" /><span>{t('productNameList')}</span></p>
          <p>{t('productNameDesc')}</p>
          <div className="list">
            {existingNamaProduk && existingNamaProduk.length > 0 ? (
              <ul>
                {existingNamaProduk.map((item) => (
                  <li key={item.id_nama_produk} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{item.nama_produk}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <IconEdit className="iconPointer greenIcon" width="16" onClick={() => onEditNamaProduk(item)} />
                      <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDeleteNamaProduk(item)} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">{t('noProductNames')}</p>
            )}
          </div>
          <div className="inputan">
            <form onSubmit={handleAddNamaProduk}>
              <input 
                type="text" 
                placeholder={t('enterProductName')} 
                value={newNamaProdukName}
                onChange={(e) => setNewNamaProdukName(e.target.value)}
                disabled={isSubmittingNamaProduk}
              />
              <button 
                className="base-btn green" 
                type="submit"
                disabled={isSubmittingNamaProduk}
              >
                {isSubmittingNamaProduk ? t('saving') : t('addProduct')}
              </button>
            </form>
          </div>
        </div>

        {/* Ukuran Satuan */}
        <div className="ukuran-satuan">
          <p className="title"><IconBotol2 className="greenIcon" /><span>{t('sizeUnitList')}</span></p>
          <p>{t('sizeUnitDesc')}</p>
          <div className="list">
            {existingSize && existingSize.length > 0 ? (
              <ul>
                {existingSize.map((item) => (
                  <li key={item.id_ukuran_satuan} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{item.nama_ukuran_satuan}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <IconEdit className="iconPointer greenIcon" width="16" onClick={() => onEditSize(item)} />
                      <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDeleteSize(item)} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">{t('noSizeUnits')}</p>
            )}
          </div>
          <div className="inputan">
            <form onSubmit={handleAddSize}>
              <input 
                type="text" 
                placeholder={t('enterSize')} 
                value={newSizeName}
                onChange={(e) => setNewSizeName(e.target.value)}
                disabled={isSubmittingSize}
              />
              <button 
                className="base-btn green" 
                type="submit"
                disabled={isSubmittingSize}
              >
                {isSubmittingSize ? t('saving') : t('addSize')}
              </button>
            </form>
          </div>
        </div>

        {/* Jenis Kemasan */}
        <div className="jenis-kemasan">
          <p className="title"><IconBotol2 className="greenIcon" /><span>{t('packagingTypeList')}</span></p>
          <p>{t('packagingTypeDesc')}</p>
          <div className="list">
            {existingKemasan && existingKemasan.length > 0 ? (
              <ul>
                {existingKemasan.map((item) => (
                  <li key={item.id_kemasan} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{item.nama_kemasan}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <IconEdit className="iconPointer greenIcon" width="16" onClick={() => onEditKemasan(item)} />
                      <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDeleteKemasan(item)} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">{t('noPackagingTypes')}</p>
            )}
          </div>
          <div className="inputan">
            <form onSubmit={handleAddKemasan}>
              <input 
                type="text" 
                placeholder={t('enterPackaging')} 
                value={newKemasanName}
                onChange={(e) => setNewKemasanName(e.target.value)}
                disabled={isSubmittingKemasan}
              />
              <button 
                className="base-btn green" 
                type="submit"
                disabled={isSubmittingKemasan}
              >
                {isSubmittingKemasan ? t('saving') : t('addPackaging')}
              </button>
            </form>
          </div>
        </div>

        {/* Metode Pengiriman */}
        <div className="metode-pengiriman">
          <p className="title"><IconDistribution className="greenIcon" /><span>{t('shippingMethodList')}</span></p>
          <p>{t('shippingMethodDesc')}</p>
          <div className="list">
            {existingMetodePengiriman && existingMetodePengiriman.length > 0 ? (
              <ul>
                {existingMetodePengiriman.map((item) => (
                  <li key={item.id_metode_pengiriman} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{dynamicT('shippingMethod', item.nama_metode)}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <IconEdit className="iconPointer greenIcon" width="16" onClick={() => onEditMetode(item)} />
                      <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDeleteMetode(item)} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">{t('noShippingMethods')}</p>
            )}
          </div>
          <div className="inputan">
            <form onSubmit={handleAddMetodePengiriman}>
              <input 
                type="text" 
                placeholder={t('enterShippingMethod')} 
                value={newMetodePengirimanName}
                onChange={(e) => setNewMetodePengirimanName(e.target.value)}
                disabled={isSubmittingMetodePengiriman}
              />
              <button 
                className="base-btn green" 
                type="submit"
                disabled={isSubmittingMetodePengiriman}
              >
                {isSubmittingMetodePengiriman ? t('saving') : t('addMethod')}
              </button>
            </form>
          </div>
        </div>

        {/* Status Pengiriman */}
        <div className="status-pengiriman">
          <p className="title"><IconStatus className="greenIcon" /><span>{t('shippingStatusList')}</span></p>
          <p>{t('shippingStatusDesc')}</p>
          <div className="list">
            {existingStatusPengiriman && existingStatusPengiriman.length > 0 ? (
              <ul>
                {existingStatusPengiriman.map((item) => (
                  <li key={item.id_status} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{dynamicT('shippingStatus', item.nama_status)}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <IconEdit className="iconPointer greenIcon" width="16" onClick={() => onEditStatus(item)} />
                      <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDeleteStatus(item)} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">{t('noShippingStatus')}</p>
            )}
          </div>
          <div className="inputan">
            <form onSubmit={handleAddStatusPengiriman}>
              <input 
                type="text" 
                placeholder={t('enterShippingStatus')} 
                value={newStatusPengirimanName}
                onChange={(e) => setNewStatusPengirimanName(e.target.value)}
                disabled={isSubmittingStatusPengiriman}
              />
              <button 
                className="base-btn green" 
                type="submit"
                disabled={isSubmittingStatusPengiriman}
              >
                {isSubmittingStatusPengiriman ? t('saving') : t('addStatus')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterData;
