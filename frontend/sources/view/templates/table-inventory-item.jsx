import React from "react";
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";

function TableInventoryItem({ rowNumber, tanggalMasuk, items, id_barang_masuk, catatan, isAdjustment, onEdit, showActions = true }) {
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

  // Handle edit click
  const handleEditClick = () => {
    if (onEdit) {
      onEdit({ id_barang_masuk, tanggal_masuk: tanggalMasuk, items, catatan_barang_masuk: catatan });
    }
  };

  const orderedData = (date) => {
    const sortedData = [...items].sort((a, b) => {
      const dateA = new Date(a.tanggal_masuk);
      const dateB = new Date(b.tanggal_masuk);
      return dateA - dateB;
    });
    return sortedData;
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
        {showActions && (
          <td>
            {!isAdjustment && (
              <IconEdit 
                className="greenIcon" 
                style={{ cursor: 'pointer' }}
                onClick={handleEditClick}
              />
            )}
          </td>
        )}
      </tr>
    );
  }

  return (
    <>
      {orderedData(items).map((item, index) => (
        <tr key={item.id_detail || index} className={index === 0 ? 'first-of-group' : 'grouped-row'}>
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
          
          {/* Show keterangan only on first item */}
          {index === 0 ? (
            <td rowSpan={items.length}>{catatan || "-"}</td>
          ) : null}
          
          {showActions && index === 0 ? (
            <td rowSpan={items.length}>
              {!isAdjustment && (
                <IconEdit 
                  className="greenIcon" 
                  style={{ cursor: 'pointer' }}
                  onClick={handleEditClick}
                />
              )}
            </td>
          ) : null}
        </tr>
      ))}
    </>
  );
}

export default TableInventoryItem;