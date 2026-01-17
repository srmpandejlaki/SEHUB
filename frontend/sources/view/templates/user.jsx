import React from "react";
import IconAdmin from "../../assets/icon/clarity_employee-line.svg?react";
import IconOwner from "../../assets/icon/fluent-mdl2_party-leader.svg?react";
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconDelete from "../../assets/icon/material-symbols_delete.svg?react";
import { useTranslation, useDynamicTranslation } from "../../contexts/localContext";

function TdUser({ no, id_pengguna, nama_pengguna, email, jabatan, is_admin, kata_sandi, onEdit, openNotifDelete }) {
  const t = useTranslation();
  const td = useDynamicTranslation();

  return (
    <tr>
      <td>{no}.</td>
      <td>{nama_pengguna}</td>
      <td>{email}</td>
      <td>{td('position', jabatan)}</td>

      <td>
        <div className="status-column">
          {is_admin === true ? (
            <IconAdmin className="icon greenIcon" />
          ) : (
            <IconOwner className="icon blueIcon" />
          )}
          <p>{is_admin === true ? t('admin') : t('nonAdmin')}</p>
        </div>
      </td>

      <td>
        <div className="buttons-column">
          <IconEdit className="iconPointer greenIcon" onClick={() => onEdit({
            id_pengguna, nama_pengguna, email, jabatan, is_admin, kata_sandi
          })} />
          <IconDelete className="iconPointer redIcon" onClick={() => openNotifDelete(id_pengguna)} />
        </div>
      </td>
    </tr>
  );
}

export default TdUser;

