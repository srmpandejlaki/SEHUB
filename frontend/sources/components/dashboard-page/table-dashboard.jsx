import React from "react";
import { Link } from 'react-router-dom';
import IconInfoTable from "../../assets/icon/mdi_information-outline.svg?react";
import { useTranslation, useDynamicTranslation } from "../../contexts/localContext";

function DashboardTable({ pendingDistributions = [] }) {
  const t = useTranslation();
  const td = useDynamicTranslation();
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const tableRows = [];
  pendingDistributions.forEach((dist, distIndex) => {
    if (dist.items && dist.items.length > 0) {
      dist.items.forEach((item, itemIndex) => {
        tableRows.push({
          ...dist,
          item,
          isFirstRow: itemIndex === 0,
          rowSpan: dist.items.length,
          rowNumber: distIndex + 1
        });
      });
    } else {
      tableRows.push({
        ...dist,
        item: null,
        isFirstRow: true,
        rowSpan: 1,
        rowNumber: distIndex + 1
      });
    }
  });

  return (
    <div className="table">
      <div className="descTable">
        <div className="title-table">
          <IconInfoTable className="icon whiteIcon" />
          <p>{t('infoDistributionProduct')}</p>
        </div>
        <div className="btn-tbl-detail base-btn">
          <Link to="/product/distribution" >{t('seeMore')}</Link>
        </div>
      </div>
      <div className="table-dashboard">
        <table>
          <thead>
              <tr>
                  <th className="center">No</th>
                  <th>{t('date')}</th>
                  <th className="center">{t('nameBuyer')}</th>
                  <th className="center">{t('product')}</th>
                  <th className="center">{t('quantity')}</th>
                  <th className="center">{t('method')}</th>
                  <th className="center">{t('status')}</th>
              </tr>
          </thead>
          <tbody>
            {tableRows.length === 0 ? (
              <tr>
                <td colSpan="8" className="center">{t('noDataDistribution')}</td>
              </tr>
            ) : (
              tableRows.map((row, index) => (
                <tr key={`${row.id_distribusi}-${index}`}>
                  {row.isFirstRow && (
                    <>
                      <td className="center" rowSpan={row.rowSpan}>{row.rowNumber}.</td>
                      <td rowSpan={row.rowSpan}>{formatDate(row.tanggal_distribusi)}</td>
                      <td className="center" rowSpan={row.rowSpan}>{row.nama_pemesan}</td>
                    </>
                  )}
                  {row.item ? (
                    <td>
                      <div className="produk-code">
                        <p className="name">
                          {row.item.nama_produk} {row.item.ukuran_produk}{row.item.nama_ukuran_satuan}
                        </p>
                      </div>
                    </td>
                  ) : (
                    "-"
                  )}
                  <td className="center">{row.item?.jumlah || "-"}</td>
                  {row.isFirstRow && (
                    <>
                      <td className="center" rowSpan={row.rowSpan}>{td('shippingMethod', row.nama_metode) || "-"}</td>
                      <td rowSpan={row.rowSpan}>{td('shippingStatus', row.nama_status) || "-"}</td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardTable;