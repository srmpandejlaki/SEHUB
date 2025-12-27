import React from "react";
import TdUser from "../../view/templates/user";

function TableUser({ views, editData, notifDelete }) {
  return (
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
          {views.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-data">Belum ada pengguna.</td>
            </tr>
          ) : (
            views.map((item, index) => (
              <TdUser
                key={item.id_pengguna}
                id_pengguna={item.id_pengguna}
                no={index + 1}
                nama_pengguna={item.nama_pengguna}
                email={item.email}
                jabatan={item.jabatan}
                is_admin={item.is_admin}
                kata_sandi={item.kata_sandi}
                onEdit={editData}
                openNotifDelete={notifDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableUser;
