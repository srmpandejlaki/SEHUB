import React from "react";
import TdUser from "../../view/templates/user";
import { useTranslation } from "../../contexts/localContext";

function TableUser({ views, editData, notifDelete }) {
  const t = useTranslation();

  return (
    <div className="table-user">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>{t('username')}</th>
            <th>Email</th>
            <th>{t('position')}</th>
            <th>{t('status')}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {views.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-data">{t('noUserData')}</td>
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

