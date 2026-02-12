import React from "react"; 
import IconPanahKiri from "../../../assets/icon/carbon_next-filled.svg?react";
import IconPanahKanan from "../../../assets/icon/carbon_next-filled-right.svg?react";
import TableInventoryItem from "../../../view/templates/table-inventory-item";
import { useTranslation } from "../../../contexts/localContext";

function TableInventory({ 
  existingData, 
  onEdit,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showActions = true
}) {
  const t = useTranslation();

  return(
    <div className="table-distribution">
      <div className="table-display">
        <table>
          <thead>
              <tr>
                  <th className="center">{t('no')}</th>
                  <th>{t('date')}</th>
                  <th>{t('product')}</th>
                  <th className="center">{t('quantity')}</th>
                  <th className="center">{t('expiredDate')}</th>
                  <th>{t('note')}</th>
                  {showActions && <th></th>}
              </tr>
          </thead>
          <tbody>
            {existingData.length === 0 ? (
              <tr>
                <td colSpan={showActions ? "7" : "6"} className="no-data">{t('noInventoryDataTable')}</td>
              </tr>
            ) : (
              existingData.map((item, index) => (
                <TableInventoryItem
                  key={item.id_barang_masuk || index}
                  rowNumber={(currentPage - 1) * 10 + index + 1}
                  tanggalMasuk={item.tanggal_masuk}
                  items={item.items}
                  id_barang_masuk={item.id_barang_masuk}
                  catatan={item.catatan_barang_masuk}
                  isAdjustment={item.is_adjustment}
                  onEdit={onEdit}
                  showActions={showActions}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-display">
        <div className="pages-count">
          <p>{t('pages')} {currentPage} {t('of')} {totalPages}</p>
        </div>
        <div className="pagination">
          <div 
            className="left"
            style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed', opacity: currentPage > 1 ? 1 : 0.5 }}
            onClick={() => currentPage > 1 && onPageChange && onPageChange(currentPage - 1)}
          >
            <IconPanahKiri className="blackIcon"/>
            <p>{t('previous')}</p>
          </div>
          <div 
            className="right"
            style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed', opacity: currentPage < totalPages ? 1 : 0.5 }}
            onClick={() => currentPage < totalPages && onPageChange && onPageChange(currentPage + 1)}
          >
            <p>{t('next')}</p>
            <IconPanahKanan className="blackIcon"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableInventory;