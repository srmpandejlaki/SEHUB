import React, { useState } from "react";
import IconAdmin from "../../assets/icon/clarity_employee-line.svg?react";
import IconOwner from "../../assets/icon/fluent-mdl2_party-leader.svg?react";
import IconOpenEye from "../../assets/icon/el_eye-open.svg?react";
import IconCloseEye from "../../assets/icon/el_eye-close.svg?react";
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconDelete from "../../assets/icon/material-symbols_delete.svg?react";

function TdUser({ no, id, name, email, jabatan, status, password, onEdit, onDelete }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <tr>
      <td>{no}.</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{jabatan}</td>

      <td>
        <div className="status-column">
          {jabatan === "admin" ? (
            <IconAdmin className="icon greenIcon" />
          ) : (
            <IconOwner className="icon blueIcon" />
          )}
          <p>{status}</p>
        </div>
      </td>

      <td>
        <div className="password-column">
          <p>{showPassword ? password : "******"}</p>

          {showPassword ? (
            <IconCloseEye
              className="icon blackIcon"
              onClick={() => setShowPassword(false)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <IconOpenEye
              className="icon blackIcon"
              onClick={() => setShowPassword(true)}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </td>

      <td>
        <div className="buttons-column">
          <IconEdit className="iconPointer greenIcon" onClick={() => onEdit({
            id, name, email, jabatan, status, password
          })} />
          <IconDelete className="iconPointer redIcon" onClick={() => onDelete(id)} />
        </div>
      </td>
    </tr>
  );
}

export default TdUser;
