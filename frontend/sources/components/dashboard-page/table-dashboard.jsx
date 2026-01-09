import React from "react";
import { Link } from 'react-router-dom';
import IconInfoTable from "../../assets/icon/mdi_information-outline.svg?react";

function DashboardTable({ recentDistributions = [] }) {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Flatten distributions for table display
  const statusPengiriman = ["Diproses", "Dalam Perjalanan"];

  const processedDistributions = recentDistributions.filter(
    (dist) => statusPengiriman.includes(dist.nama_status)
  );

  const tableRows = [];
  processedDistributions.forEach((dist, distIndex) => {
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
          <p>Informasi Distribusi Produk</p>
        </div>
        <div className="btn-tbl-detail base-btn">
          <Link to="/product/distribution" >Selengkapnya</Link>
        </div>
      </div>
      <div className="table-dashboard">
        <table>
          <thead>
              <tr>
                  <th className="center">No</th>
                  <th>Hari/Tanggal</th>
                  <th className="center">Nama Pemesan</th>
                  <th className="center">Produk</th>
                  <th className="center">Jumlah</th>
                  <th className="center">Metode</th>
                  <th className="center">Status</th>
              </tr>
          </thead>
          <tbody>
            {tableRows.length === 0 ? (
              <tr>
                <td colSpan="8" className="center">Belum ada data distribusi</td>
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
                      <td className="center" rowSpan={row.rowSpan}>{row.nama_metode || "-"}</td>
                      <td rowSpan={row.rowSpan}>{row.nama_status || "-"}</td>
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