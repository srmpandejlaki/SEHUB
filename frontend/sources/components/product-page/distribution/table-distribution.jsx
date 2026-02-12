import React from "react"; 
import IconEdit from "../../../assets/icon/flowbite_edit-outline.svg?react";
import IconPanahKiri from "../../../assets/icon/carbon_next-filled.svg?react";
import IconPanahKanan from "../../../assets/icon/carbon_next-filled-right.svg?react";
import { useTranslation, useDynamicTranslation, useLocalizedDate } from "../../../contexts/localContext";

function TableDistribution({ 
  data = [], 
  statusPengiriman = [], 
  onStatusChange, 
  onEdit,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  disableStatusSelect = false,
  showActions = true
}) {
  const t = useTranslation();
  const td = useDynamicTranslation();
  const formatDate = useLocalizedDate();

  const handleStatusChange = async (id_distribusi, newStatus) => {
    if (onStatusChange) {
      await onStatusChange(id_distribusi, parseInt(newStatus));
    }
  };

  // Calculate total per distribution
  const getDistributionTotal = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + (item.jumlah || 0), 0);
  };

  // Flatten data for table display (each product item as a row, grouped by distribution)
  const tableRows = [];
  data.forEach((dist, distIndex) => {
    if (dist.items && dist.items.length > 0) {
      dist.items.forEach((item, itemIndex) => {
        tableRows.push({
          ...dist,
          item,
          isFirstRow: itemIndex === 0,
          rowSpan: dist.items.length,
          distIndex: (currentPage - 1) * 10 + distIndex + 1,
          total: getDistributionTotal(dist.items)
        });
      });
    } else {
      tableRows.push({
        ...dist,
        item: null,
        isFirstRow: true,
        rowSpan: 1,
        distIndex: (currentPage - 1) * 10 + distIndex + 1,
        total: 0
      });
    }
  });

  return(
    <div className="table-distribution">
      <div className="table-display">
        <table>
          <thead>
            <tr>
              <th className="center">{t('no')}</th>
              <th>{t('date')}</th>
              <th className="center">{t('nameBuyer')}</th>
              <th>{t('productCode')}</th>
              <th>{t('productName')}</th>
              <th className="center">{t('quantity')}</th>
              <th className="center">{t('total')}</th>
              <th>{t('shipmentMethod')}</th>
              <th className="center">{t('shipmentStatus')}</th>
              {showActions && (
                <th></th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableRows.length === 0 ? (
              <tr>
                <td colSpan="11" className="center">{t('noDataDistribution')}</td>
              </tr>
            ) : (
              tableRows.map((row, index) => (
                <tr key={`${row.id_distribusi}-${index}`} className={row.isFirstRow ? 'first-of-group' : 'grouped-row'}>
                  {row.isFirstRow && (
                    <>
                      <td className="center" rowSpan={row.rowSpan}>{row.distIndex}.</td>
                      <td rowSpan={row.rowSpan}>{formatDate(row.tanggal_distribusi)}</td>
                      <td className="center" rowSpan={row.rowSpan}>{row.nama_pemesan}</td>
                    </>
                  )}
                  <td>
                    {row.item ? (
                      <div className="produk-code">
                        <p className="center">{row.item.id_produk}</p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {row.item ? (
                      <div className="produk-detail">
                        <p className="name">
                          {row.item.nama_produk} {row.item.ukuran_produk}{row.item.nama_ukuran_satuan}
                        </p>
                        <p className="expired">
                          {row.item.tanggal_expired ? formatDate(row.item.tanggal_expired) : "-"}
                        </p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="center">{row.item?.jumlah || "-"}</td>
                  {row.isFirstRow && (
                    <>
                      <td className="center" rowSpan={row.rowSpan}>{row.total}</td>
                      <td rowSpan={row.rowSpan}>{td('shippingMethod', row.nama_metode) || "-"}</td>
                      {/* <td rowSpan={row.rowSpan}>{row.catatan_distribusi || "-"}</td> */}
                      <td rowSpan={row.rowSpan}>
                        <select 
                          value={row.id_status || ""}
                          onChange={(e) => handleStatusChange(row.id_distribusi, e.target.value)}
                          disabled={disableStatusSelect || row.is_adjustment}
                          style={(disableStatusSelect || row.is_adjustment) ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                        >
                          {statusPengiriman.map((status) => (
                            <option key={status.id_status} value={status.id_status}>
                              {td('shippingStatus', status.nama_status)}
                            </option>
                          ))}
                        </select>
                      </td>
                      {showActions && (
                      <td rowSpan={row.rowSpan}>
                        {!row.is_adjustment && (
                          <IconEdit 
                            className="icon greenIcon" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => onEdit && onEdit(row)}
                          />
                        )}
                      </td>
                      )}
                    </>
                  )}
                </tr>
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

export default TableDistribution;