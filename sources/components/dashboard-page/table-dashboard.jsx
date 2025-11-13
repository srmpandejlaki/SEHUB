import React from "react";

function DashboardTable() {
  return (
    <div className="table">
      <p>Informasi Distribusi Produk</p>
      <div className="table-dashboard">
        <table>
          <thead>
              <tr>
                  <th>No</th>
                  <th>Hari/Tanggal</th>
                  <th>Nama Pemesan</th>
                  <th>Produk</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                  <th>Nama Pengirim</th>
                  <th></th>
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
                  <td>
                      <a href="">lihat detail</a>
                  </td>
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
                  <td>
                      <a href="">lihat detail</a>
                  </td>
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
                  <td>
                      <a href="">lihat detail</a>
                  </td>
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
                  <td>
                      <a href="">lihat detail</a>
                  </td>
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
                  <td>
                      <a href="">lihat detail</a>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardTable;