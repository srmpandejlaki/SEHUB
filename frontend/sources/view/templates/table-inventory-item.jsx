import React from "react";
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";

function TableInventoryItem({ rowNumber, tanggalMasuk, items }) {
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // If no items, show empty row
  if (!items || items.length === 0) {
    return (
      <tr>
        <td className="center">{rowNumber}.</td>
        <td>{formatDate(tanggalMasuk)}</td>
        <td>-</td>
        <td className="center">-</td>
        <td className="center">-</td>
        <td>-</td>
        <td><IconEdit className="greenIcon" /></td>
      </tr>
    );
  }

  return (
    <>
      {items.map((item, index) => (
        <tr key={item.id_detail || index}>
          {/* Show row number and date only on first item */}
          {index === 0 ? (
            <>
              <td className="center" rowSpan={items.length}>{rowNumber}.</td>
              <td rowSpan={items.length}>{formatDate(tanggalMasuk)}</td>
            </>
          ) : null}
          
          <td>
            <div className="kode">{item.id_produk}</div>
            <div className="nama">{item.nama_produk} {item.ukuran_produk}{item.nama_ukuran_satuan}</div>
          </td>
          
          <td className="center">{item.jumlah} {item.nama_kemasan}</td>
          
          <td className="center">{formatDate(item.tanggal_expired)}</td>
          
          <td>{item.keterangan || "-"}</td>
          
          {index === 0 ? (
            <td rowSpan={items.length}><IconEdit className="greenIcon" /></td>
          ) : null}
        </tr>
      ))}
    </>
  );
}

export default TableInventoryItem;