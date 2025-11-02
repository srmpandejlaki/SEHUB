import React from "react";

function DashboardTable() {
  return (
    <table className="table-dashboard">
      <thead>
          <tr>
              <th>No</th>
              <th>Kode Barang</th>
              <th>Nama Produk</th>
              <th>Stok Sekarang</th>
              <th>Jumlah Terjual</th>
              <th>Pembaruan Terakhir</th>
              <th className="column-action">Aksi</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>1</td>
              <td>LS-001</td>
              <td>Seho Granule</td>
              <td>10</td>
              <td>Penyimpanan 1</td>
              <td>Penyimpanan 1</td>
              <td>
                  <a href="">lihat detail</a>
              </td>
          </tr>
          <tr>
              <td>1</td>
              <td>LS-001</td>
              <td>Seho Granule</td>
              <td>10</td>
              <td>Penyimpanan 1</td>
              <td>Penyimpanan 1</td>
              <td>
                  <a href="">lihat detail</a>
              </td>
          </tr>
          <tr>
              <td>1</td>
              <td>LS-001</td>
              <td>Seho Granule</td>
              <td>10</td>
              <td>Penyimpanan 1</td>
              <td>Penyimpanan 1</td>
              <td>
                  <a href="">lihat detail</a>
              </td>
          </tr>
      </tbody>
    </table>
  );
}

export default DashboardTable;