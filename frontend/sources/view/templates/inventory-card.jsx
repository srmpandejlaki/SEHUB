import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";
import { useTranslation } from "../../contexts/localContext";

function InventoryCard({ namaProduk, ukuranProduk, ukuranSatuan, minimumStock, stokSekarang, imageProduk, onEdit }) {
  // Determine if stock is low
  const isLowStock = stokSekarang < minimumStock;

  const t = useTranslation();
  
  return(
    <div className="items" style={{ position: "relative" }}>
      {onEdit && (
        <div 
        className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          title="Edit Produk"
        >
          <IconEdit className="icon darkGreenIcon" width="20" height="20" style={{ color: "#1B5E20" }} />
        </div>
      )}
      <img src={imageProduk} alt={namaProduk} />
      <div className="item-desc">
        <p className="product-name">{namaProduk}<br/><span>{ukuranProduk}{ukuranSatuan}</span></p>
        <div className="counting">
          <div className="minimum-stock">
            <p className="title">{t('minimumStock')}</p>
            <p className="number">{minimumStock || 0}</p>
          </div>
          <div className="stock-now">
            <p className="title">{t('stockNow')}</p>
            <p className={`number ${isLowStock ? 'low-stock' : ''}`}>{stokSekarang || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryCard;