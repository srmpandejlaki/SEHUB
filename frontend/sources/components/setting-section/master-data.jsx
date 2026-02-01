import React, { useState, memo } from "react";
import IconBotol2 from "../../assets/icon/Frame 27.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";
import IconStatus from "../../assets/icon/fluent_status-12-regular.svg?react";
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconDelete from "../../assets/icon/material-symbols_delete.svg?react";
import IconCheck from "../../assets/icon/weui_done2-filled.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";
import { useTranslation, useDynamicTranslation } from "../../contexts/localContext";
import { useToast } from "../../contexts/toastContext";

// Sub-component for individual master data items with inline editing
const MasterDataItem = memo(({ item, idField, nameField, onEdit, onDelete, dynamicCategory }) => {
  const t = useTranslation();
  const dynamicT = useDynamicTranslation();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item[nameField]);

  const handleSave = async () => {
    if (editValue.trim() === "") {
      showToast(t('fieldEmpty') || "Field cannot be empty", 'warning');
      return;
    }
    if (editValue !== item[nameField]) {
      await onEdit(item[idField], editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(item[nameField]);
    setIsEditing(false);
  };

  const displayName = dynamicCategory 
    ? dynamicT(dynamicCategory, item[nameField])
    : item[nameField];

  return (
    <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
      {isEditing ? (
        <div style={{ display: "flex", flex: 1, gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            className="inline-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
            style={{ flex: 1, padding: "4px 8px", borderRadius: "4px", border: "1px solid #28a745" }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <IconCheck className="iconPointer greenIcon" width="18" onClick={handleSave} />
            <IconCancel className="iconPointer blackIcon" width="18" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <>
          <span>{displayName}</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <IconEdit className="iconPointer greenIcon" width="16" onClick={() => setIsEditing(true)} title={t('edit')} />
            <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDelete(item)} title={t('delete')} />
          </div>
        </>
      )}
    </li>
  );
});

// Sub-component for each master data section to prevent parent re-renders when typing
const MasterDataSection = memo(({ 
  title, 
  desc, 
  icon: Icon, 
  items, 
  idField, 
  nameField, 
  onAdd, 
  onEdit, 
  onDelete, 
  placeholder, 
  idPrefix,
  addLabel,
  dynamicCategory 
}) => {
  const t = useTranslation();
  const [newValue, setNewValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newStatusPengirimanName.trim()) {
      alert("Status pengiriman tidak boleh kosong");
      return;
    }
    setIsSubmitting(true);
    await onAdd(newValue.trim());
    setNewValue("");
    setIsSubmitting(false);
  };

  return (
    <div className={idPrefix}>
      <p className="title"><Icon className="greenIcon" /><span>{title}</span></p>
      <p>{desc}</p>
      <div className="list">
        {items && items.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item) => (
              <MasterDataItem
                key={item[idField]}
                item={item}
                idField={idField}
                nameField={nameField}
                onEdit={onEdit}
                onDelete={onDelete}
                dynamicCategory={dynamicCategory}
              />
            ))}
          </ul>
        ) : (
          <p className="no-data" style={{ padding: "20px", textAlign: "center", color: "#999" }}>{t('noData') || "No data available"}</p>
        )}
      </div>
      <div className="inputan">
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
          <input 
            type="text" 
            placeholder={placeholder} 
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            disabled={isSubmitting}
          />
          <button 
            className="base-btn green" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('saving') : addLabel}
          </button>
        </form>
      </div>
    </div>
  );
});

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

  return (
    <div className="master-data">
      <div className="pengantar">
        <h3>Pengaturan Master Data</h3>
      </div>
      <div className="main-data-setting">
        
        <MasterDataSection
          title={t('productNameList')}
          desc={t('productNameDesc')}
          icon={IconBotol2}
          items={existingNamaProduk}
          idField="id_nama_produk"
          nameField="nama_produk"
          onAdd={createNamaProduk}
          onEdit={onEditNamaProduk}
          onDelete={onDeleteNamaProduk}
          placeholder={t('enterProductName')}
          idPrefix="nama-produk"
          addLabel={t('addProduct')}
        />

        <MasterDataSection
          title={t('sizeUnitList')}
          desc={t('sizeUnitDesc')}
          icon={IconBotol2}
          items={existingSize}
          idField="id_ukuran_satuan"
          nameField="nama_ukuran_satuan"
          onAdd={createSize}
          onEdit={onEditSize}
          onDelete={onDeleteSize}
          placeholder={t('enterSize')}
          idPrefix="ukuran-satuan"
          addLabel={t('addSize')}
        />

        <MasterDataSection
          title={t('packagingTypeList')}
          desc={t('packagingTypeDesc')}
          icon={IconBotol2}
          items={existingKemasan}
          idField="id_kemasan"
          nameField="nama_kemasan"
          onAdd={createKemasan}
          onEdit={onEditKemasan}
          onDelete={onDeleteKemasan}
          placeholder={t('enterPackaging')}
          idPrefix="jenis-kemasan"
          addLabel={t('addPackaging')}
        />

        <MasterDataSection
          title={t('shippingMethodList')}
          desc={t('shippingMethodDesc')}
          icon={IconDistribution}
          items={existingMetodePengiriman}
          idField="id_metode_pengiriman"
          nameField="nama_metode"
          onAdd={createMetodePengiriman}
          onEdit={onEditMetode}
          onDelete={onDeleteMetode}
          placeholder={t('enterShippingMethod')}
          idPrefix="metode-pengiriman"
          addLabel={t('addMethod')}
          dynamicCategory="shippingMethod"
        />

        <MasterDataSection
          title={t('shippingStatusList')}
          desc={t('shippingStatusDesc')}
          icon={IconStatus}
          items={existingStatusPengiriman}
          idField="id_status"
          nameField="nama_status"
          onAdd={createStatusPengiriman}
          onEdit={onEditStatus}
          onDelete={onDeleteStatus}
          placeholder={t('enterShippingStatus')}
          idPrefix="status-pengiriman"
          addLabel={t('addStatus')}
          dynamicCategory="shippingStatus"
        />
      </div>
    </div>
  );
}

export default MasterData;
