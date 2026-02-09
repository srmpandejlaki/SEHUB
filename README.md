# SEHUB+ 

Aplikasi Pengelolaan Inventori dan Distribusi Produk L'Arbre Seho

## 📋 Requirements

### System Requirements
- **Node.js** v18.0.0 atau lebih baru
- **npm** v9.0.0 atau lebih baru
- **Windows** 10/11 (untuk build Electron)

### Tech Stack
- **Frontend**: React 19, Vite, SCSS, Recharts
- **Backend**: Express.js 5, SQLite (sql.js)
- **Desktop**: Electron 28

---

## 🚀 Instalasi & Menjalankan Aplikasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd SEHUB+
```

### 2. Install Dependencies

**Install root dependencies (Electron):**
```bash
npm install
```

**Install backend dependencies:**
```bash
cd backend
npm install
cd ..
```

**Install frontend dependencies:**
```bash
cd frontend
npm install
cd ..
```

### 3. Jalankan Aplikasi (Development Mode)
```bash
npm run dev
```

Perintah ini akan menjalankan:
- Backend server di `http://localhost:5000`
- Frontend dev server di `http://localhost:5173`
- Electron app

---

## 📦 Build untuk Production

### Build Semua & Buat Installer
```bash
npm run build:all
```

### Build Frontend Saja
```bash
npm run build:frontend
```

### Build Installer Windows
```bash
npm run dist
```

File installer akan berada di folder `release/`.

---

## 📁 Struktur Folder

```
SEHUB+/
├── backend/           # Backend Express.js
│   ├── src/
│   │   ├── config/    # Database & konfigurasi
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
├── frontend/          # Frontend React + Vite
│   ├── sources/
│   │   ├── assets/    # Gambar & icons
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── styles/    # SCSS files
│   │   ├── utilities/
│   │   └── view/      # Pages & templates
│   └── package.json
├── electron/          # Electron main process
│   ├── main.js
│   └── preload.js
├── build/             # App icons
└── package.json       # Root package.json
```

---

## 🔐 Default Login

Setelah aplikasi berjalan pertama kali, gunakan kredensial berikut:

| Email | Password | Role |
|-------|----------|------|
| admin@sehub.com | admin123 | Administrator |

---

## 🛠️ Scripts yang Tersedia

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Jalankan development mode |
| `npm run start` | Jalankan Electron saja (butuh build frontend) |
| `npm run build:frontend` | Build frontend untuk production |
| `npm run build:all` | Build semua & buat installer |
| `npm run dist` | Buat installer Windows |

---

## 📝 Catatan Penting

1. **Database**: Aplikasi menggunakan SQLite yang disimpan lokal. Data development berada di `backend/src/data/sehub.db`.

2. **Port yang Digunakan**:
   - Backend: `5000`
   - Frontend (dev): `5173`

3. **Troubleshooting**:
   - Jika terjadi error "module not found", pastikan sudah menjalankan `npm install` di semua folder.
   - Jika backend tidak berjalan, pastikan port 5000 tidak digunakan aplikasi lain.

---

## 📄 License

MIT License - PT. Rumah Seho Nusantara
