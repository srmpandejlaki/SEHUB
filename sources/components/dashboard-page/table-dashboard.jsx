import React from "react";
import IconInfoTable from "../../assets/icon/mdi_information-outline.svg?react";

function DashboardTable() {
  return (
    <div className="table">
      <div className="descTable">
        <div className="title-table">
          <IconInfoTable className="icon blackIcon" />
          <p>Informasi Distribusi Produk</p>
        </div>
        <div className="btn-tbl-detail base-btn">
          <p>Selengkapnya</p>
        </div>
      </div>
      <div className="table-dashboard">
        <table>
          <thead>
              <tr>
                  <th className="center">No</th>
                  <th>Hari/Tanggal</th>
                  <th>Nama Pemesan</th>
                  <th>Produk</th>
                  <th className="center">Jumlah</th>
                  <th className="center">Total</th>
                  <th>Nama Pengirim</th>
                  <th>Status</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td className="center">1</td>
                  <td>23 Oktober 2025</td>
                  <td>Budiono</td>
                  <td>
                    <div className="produk-code">
                      <p className="code">LS-001</p>
                      <p className="name">Seho Granule 150g</p>
                    </div>
                  </td>
                  <td className="center">15</td>
                  <td className="center">15</td>
                  <td>Cristiano</td>
                  <td>Pengemasan</td>
              </tr>
              <tr>
                  <td className="center">1</td>
                  <td>23 Oktober 2025</td>
                  <td>Budiono</td>
                  <td>
                    <div className="produk-code">
                      <p className="code">LS-001</p>
                      <p className="name">Seho Granule 150g</p>
                    </div>
                  </td>
                  <td className="center">15</td>
                  <td className="center">15</td>
                  <td>Cristiano</td>
                  <td>Sudah Diterima</td>
              </tr>
              <tr>
                  <td className="center">1</td>
                  <td>23 Oktober 2025</td>
                  <td>Budiono</td>
                  <td>
                    <div className="produk-code">
                      <p className="code">LS-001</p>
                      <p className="name">Seho Granule 150g</p>
                    </div>
                  </td>
                  <td className="center">15</td>
                  <td className="center">15</td>
                  <td>Cristiano</td>
                  <td>Dalam Perjalanan</td>
              </tr>
              <tr>
                  <td className="center">1</td>
                  <td>23 Oktober 2025</td>
                  <td>Budiono</td>
                  <td>
                    <div className="produk-code">
                      <p className="code">LS-001</p>
                      <p className="name">Seho Granule 150g</p>
                    </div>
                  </td>
                  <td className="center">15</td>
                  <td className="center">15</td>
                  <td>Cristiano</td>
                  <td>Dalam Perjalanan</td>
              </tr>
              <tr>
                  <td className="center">1</td>
                  <td>23 Oktober 2025</td>
                  <td>Budiono</td>
                  <td>
                    <div className="produk-code">
                      <p className="code">LS-001</p>
                      <p className="name">Seho Granule 150g</p>
                    </div>
                  </td>
                  <td className="center">15</td>
                  <td className="center">15</td>
                  <td>Cristiano</td>
                  <td>Dalam Perjalanan</td>
              </tr>
              <tr>
                  <td className="center">1</td>
                  <td>23 Oktober 2025</td>
                  <td>Budiono</td>
                  <td>
                    <div className="produk-code">
                      <p className="code">LS-001</p>
                      <p className="name">Seho Granule 150g</p>
                    </div>
                  </td>
                  <td className="center">15</td>
                  <td className="center">15</td>
                  <td>Cristiano</td>
                  <td>Sudah Diterima</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardTable;