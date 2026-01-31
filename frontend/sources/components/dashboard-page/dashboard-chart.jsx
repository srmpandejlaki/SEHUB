import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function DashboardChart({ monthlyData, products, selectedProduct, onProductChange }) {
  return (
    <div className="dashboard-chart">
      <div className="chart-header">
        <h4>Grafik Inventori & Distribusi - {monthlyData?.bulan || 'Bulan Ini'}</h4>
        <div className="chart-filter">
          <label>Filter Produk:</label>
          <select 
            value={selectedProduct || ''} 
            onChange={(e) => onProductChange(e.target.value || null)}
          >
            <option value="">Keseluruhan</option>
            {products?.map((product) => (
              <option key={product.id_produk} value={product.id_produk}>
                {product.nama_produk} {product.ukuran_produk}{product.nama_ukuran_satuan}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {!monthlyData || !monthlyData.data || monthlyData.data.length === 0 ? (
        <p className="no-data">Tidak ada data untuk ditampilkan.</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={monthlyData.data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="tanggal" 
              tick={{ fontSize: 12 }}
              label={{ value: 'Tanggal', position: 'bottom', offset: -5 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ value: 'Jumlah', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #ccc',
                borderRadius: '8px'
              }}
              formatter={(value, name) => [value, name === 'inventori' ? 'Inventori' : 'Distribusi']}
              labelFormatter={(label) => `Tanggal ${label}`}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => value === 'inventori' ? 'Inventori' : 'Distribusi'}
            />
            <Line
              type="monotone"
              dataKey="inventori"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="distribusi"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default DashboardChart;
