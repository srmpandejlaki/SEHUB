import React from "react";
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";

function TableInventoryItem() {
  return (
    <>
      {/* Baris pertama = ada no & tanggal */}
      <tr>
        <td className="center">no.</td>

        <td>Hari/Tanggal</td>

        <td>
          <div className="kode"></div>
          <div className="nama"></div>
        </td>

        <td className="center"></td>
        <td className="center">
          
        </td>

        <td></td>

        <td><IconEdit /></td>
      </tr>
    </>
  );
}

export default TableInventoryItem;