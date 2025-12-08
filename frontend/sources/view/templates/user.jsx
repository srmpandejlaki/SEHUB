import React from "react";
import IconAdmin from "../../assets/icon/clarity_employee-line.svg?react";
import IconOwner from "../../assets/icon/fluent-mdl2_party-leader.svg?react";
import IconOpenEye from "../../assets/icon/el_eye-open.svg?react";
import IconCloseEye from "../../assets/icon/el_eye-close.svg?react";
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconDelete from "../../assets/icon/material-symbols_delete.svg?react";

function TdUser({ no, name, email, jabatan, status, password }) {
  return (
    <tr>
      <td>{no}.</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{jabatan}</td>

      <td>
        <div className="status-column">
          {jabatan === "Admin" ? (
            <IconAdmin className="icon greenIcon" />
          ) : (
            <IconOwner className="icon blueIcon" />
          )}
          <p>{status}</p>
        </div>
      </td>

      <td>
        <div className="password-column">
          <p>{password}</p>
          <IconOpenEye className="icon blackIcon" />
        </div>
      </td>

      <td>
        <div className="buttons-column">
          <IconEdit className="icon greenIcon" />
          <IconDelete className="icon redIcon" />
        </div>
      </td>
    </tr>
  );
}

export default TdUser;
