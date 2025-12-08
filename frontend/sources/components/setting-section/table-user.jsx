import React from "react";
import IconAdmin from "../../assets/icon/clarity_employee-line.svg?react";
import IconOwner from "../../assets/icon/fluent-mdl2_party-leader.svg?react";
import IconOpenEye from "../../assets/icon/el_eye-open.svg?react";
import IconCloseEye from "../../assets/icon/el_eye-close.svg?react";
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconDelete from "../../assets/icon/material-symbols_delete.svg?react";

function TableUser() {
  return(
    <div className="table-user">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Pengguna</th>
            <th>Email</th>
            <th>Jabatan</th>
            <th>Status</th>
            <th>Kata Sandi</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>Cristian</td>
            <td>cristian01@gmail.com</td>
            <td>Karyawan</td>
            <td>
              <div className="status-column">
                <IconAdmin className="icon greenIcon" /> <p>Admin</p>
              </div>
            </td>
            <td>
              <div className="password-column">
                <p>admin123</p> <IconOpenEye className="icon blackIcon" />
              </div>
            </td>
            <td>
              <div className="buttons-column">
                <IconEdit className="icon greenIcon" />
                <IconDelete className="icon redIcon" />
              </div>
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Jonathan</td>
            <td>jonathan02@gmail.com</td>
            <td>Pemilik Perusahaan</td>
            <td>
              <div className="status-column">
                <IconOwner className="icon greenIcon" /> <p>Pemilik</p>
              </div>
            </td>
            <td>
              <div className="password-column">
                <p>******</p> <IconCloseEye className="icon blackIcon" />
              </div>
            </td>
            <td>
              <div className="buttons-column">
                <IconEdit className="icon greenIcon" />
                <IconDelete className="icon redIcon" />
              </div>
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Jonathan</td>
            <td>jonathan02@gmail.com</td>
            <td>Pemilik Perusahaan</td>
            <td>
              <div className="status-column">
                <IconOwner className="icon greenIcon" /> <p>Pemilik</p>
              </div>
            </td>
            <td>
              <div className="password-column">
                <p>******</p> <IconCloseEye className="icon blackIcon" />
              </div>
            </td>
            <td>
              <div className="buttons-column">
                <IconEdit className="icon greenIcon" />
                <IconDelete className="icon redIcon" />
              </div>
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Jonathan</td>
            <td>jonathan02@gmail.com</td>
            <td>Pemilik Perusahaan</td>
            <td>
              <div className="status-column">
                <IconOwner className="icon greenIcon" /> <p>Pemilik</p>
              </div>
            </td>
            <td>
              <div className="password-column">
                <p>******</p> <IconCloseEye className="icon blackIcon" />
              </div>
            </td>
            <td>
              <div className="buttons-column">
                <IconEdit className="icon greenIcon" />
                <IconDelete className="icon redIcon" />
              </div>
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Jonathan</td>
            <td>jonathan02@gmail.com</td>
            <td>Pemilik Perusahaan</td>
            <td>
              <div className="status-column">
                <IconOwner className="icon greenIcon" /> <p>Pemilik</p>
              </div>
            </td>
            <td>
              <div className="password-column">
                <p>******</p> <IconCloseEye className="icon blackIcon" />
              </div>
            </td>
            <td>
              <div className="buttons-column">
                <IconEdit className="icon greenIcon" />
                <IconDelete className="icon redIcon" />
              </div>
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Jonathan</td>
            <td>jonathan02@gmail.com</td>
            <td>Pemilik Perusahaan</td>
            <td>
              <div className="status-column">
                <IconOwner className="icon greenIcon" /> <p>Pemilik</p>
              </div>
            </td>
            <td>
              <div className="password-column">
                <p>******</p> <IconCloseEye className="icon blackIcon" />
              </div>
            </td>
            <td>
              <div className="buttons-column">
                <IconEdit className="icon greenIcon" />
                <IconDelete className="icon redIcon" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableUser;