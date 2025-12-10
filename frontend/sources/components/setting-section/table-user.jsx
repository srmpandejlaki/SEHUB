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
                key={item.id}
                id={item.id}
                no={index + 1}
                name={item.name}
                email={item.email}
                jabatan={item.jabatan}
                status={item.status}
                password={item.password}
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
