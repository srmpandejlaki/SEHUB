import React from "react"; 
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconPanahKiri from "../../assets/icon/carbon_next-filled.svg?react";
import IconPanahKanan from "../../assets/icon/carbon_next-filled-right.svg?react";

function TableDistribution() {
  return(
    <div className="table-distribution">
      <div className="table-display">
        <table>
          <thead>
              <tr>
                  <th className="center">No</th>
                  <th>Hari/Tanggal</th>
                  <th>Nama Pemesan</th>
                  <th>Produk</th>
                  <th className="center">Jumlah</th>
                  <th className="center">Total</th>
                  <th>Metode Pengiriman</th>
                  <th>Nama Pengirim</th>
                  <th className="center">Status</th>
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
                  <td>Jasa Kurir</td>
                  <td>JNE</td>
                  <td>
                    <select name="Status" id="">
                      <option value="admin">Pengemasan</option>
                      <option value="owner">Dalam Perjalanan</option>
                      <option value="">Sudah Diterima</option>
                    </select>
                  </td>
                  <td><IconEdit className="icon greenIcon" /></td>
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
                  <td>Pengantaran Langsung</td>
                  <td>Cristiano</td>
                  <td>
                    <select name="Status" id="">
                      <option value="admin">Pengemasan</option>
                      <option value="owner">Dalam Perjalanan</option>
                      <option value="">Sudah Diterima</option>
                    </select>
                  </td>
                  <td><IconEdit className="icon greenIcon" /></td>
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
                  <td>Pengantaran Langsung</td>
                  <td>Cristiano</td>
                  <td>
                    <select name="Status" id="">
                      <option value="admin">Pengemasan</option>
                      <option value="owner">Dalam Perjalanan</option>
                      <option value="">Sudah Diterima</option>
                    </select>
                  </td>
                  <td><IconEdit className="icon greenIcon" /></td>
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
                  <td>Pengantaran Langsung</td>
                  <td>Cristiano</td>
                  <td>
                    <select name="Status" id="">
                      <option value="admin">Pengemasan</option>
                      <option value="owner">Dalam Perjalanan</option>
                      <option value="">Sudah Diterima</option>
                    </select>
                  </td>
                  <td><IconEdit className="icon greenIcon" /></td>
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
                  <td>Pengantaran Langsung</td>
                  <td>Cristiano</td>
                  <td>
                    <select name="Status" id="">
                      <option value="admin">Pengemasan</option>
                      <option value="owner">Dalam Perjalanan</option>
                      <option value="">Sudah Diterima</option>
                    </select>
                  </td>
                  <td><IconEdit className="icon greenIcon" /></td>
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
                  <td>Jasa Kurir</td>
                  <td>JNE</td>
                  <td>
                    <select name="Status" id="">
                      <option value="admin">Pengemasan</option>
                      <option value="owner">Dalam Perjalanan</option>
                      <option value="">Sudah Diterima</option>
                    </select>
                  </td>
                  <td><IconEdit className="icon greenIcon" /></td>
              </tr><tr>
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
                  <td>Jasa Kurir</td>
                  <td>JNE</td>
                  <td>
                    <select name="Status" id="">
                      <option value="admin">Pengemasan</option>
                      <option value="owner">Dalam Perjalanan</option>
                      <option value="">Sudah Diterima</option>
                    </select>
                  </td>
                  <td><IconEdit className="icon greenIcon" /></td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className="pagination-display">
        <div className="pages-count">
          <p>Halaman 1 dari 24</p>
        </div>
        <div className="pagination">
          <div className="left">
            <IconPanahKiri blackIcon/>
            <p>Sebelumnya</p>
          </div>
          <div className="right">
            <p>Setelahnya</p>
            <IconPanahKanan blackIcon/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableDistribution;