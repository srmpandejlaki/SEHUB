const translations = {
  id: {
    // Header
    headerTitle: "Aplikasi Pengelolaan Inventori dan Distribusi Produk L' Arbre Seho",
    
    // Sidebar Menu
    menu: "MENU",
    home: "Beranda",
    product: "Produk",
    report: "Laporan",
    settings: "Pengaturan",
    logout: "Keluar",
    logoutConfirm: "Apakah Anda yakin ingin keluar?",
    poweredBy: "Powered by : PT. Rumah Seho Nusantara",
    
    // Login Page
    loginTitle: "Aplikasi Pengelolaan Inventori dan Distribusi Produk L' Arbre Seho",
    loginSubtitle: "PT. Rumah Seho Nusantara",
    email: "Email",
    emailPlaceholder: "Masukkan email",
    password: "Kata Sandi",
    passwordPlaceholder: "Masukkan kata sandi",
    login: "Masuk",
    processing: "Memproses...",
    emailPasswordRequired: "Email dan password wajib diisi",
    
    // Common
    loading: "Memuat...",
    date: "Hari/Tanggal",
    quantity: "Jumlah",
    method: "Metode",
    status: "Status",
    total: "Total",
    shipmentMethod: "Metode Pengiriman",
    shipmentStatus: "Status Pengiriman",
    nameBuyer: "Nama Pemesan",
    productCode: "Kode Produk",
    searchProduct: "Cari Produk...",
    searchDistribution: "Cari Data Distribusi...",
    pages: "Halaman",
    of: "dari",
    previous: "Sebelumnya",
    next: "Selanjutnya",

    //Dashboard
    greeting: "Selamat Datang",
    loadingDashboard: "Memuat data dashboard...",
    graphicDashboard: "Grafik Inventori & Distribusi",
    monthThis: "Bulan Ini",
    filterProduct: "Filter Produk",
    allProduct: "Semua Produk",
    noData: "Tidak ada data untuk ditampilkan.",
    inventory: "Inventori",
    distribution: "Distribusi",
    notification: "Pemberitahuan",
    noExpiredData: "Tidak ada produk yang akan kadaluarsa dalam 30 hari ke depan.",
    monthlySummaryTitle: "Ringkasan Bulan",
    totalProducts: "Total Produk",
    totalIncoming: "Total Barang Masuk",
    totalDistribution: "Total Distribusi",
    totalReturn: "Total Barang Retur",
    totalAdjustment: "Penyesuaian Stok",
    infoDistributionProduct: "Informasi Distribusi Produk",
    seeMore: "Selengkapnya",
    noDataDistribution: "Tidak ada data distribusi",

    //inventory page
    inventoryTitle: "Pratinjau Data Inventori",
    inventoryDesc: "menampilkan jumlah stok saat ini.",
    minimumStock: "Minimal",
    stockNow: "Sekarang",
    inventoryHistoryTitle: "Riwayat Barang Masuk",

    //distribution page
    distributionTitle: "Pratinjau Data Distribusi",
    distributionDesc: "menampilkan data distribusi dengan status pengiriman Diproses dan Dalam Perjalanan.",
    distributionHistoryTitle: "Riwayat Distribusi",

    //product nav
    inventoryBtn: "Inventori Produk",
    distributionBtn: "Distribusi Produk",
    returnBtn: "Retur Barang",
    stockAdjustmentBtn: "Penyesuaian Stok Gudang",

    //buttons
    addProduct: "Tambah Produk",
    addData: "Tambah Data",
    addInventoryData: "Barang Masuk",
    historyData: "Riwayat Data",
    saveBtn: "Simpan",
    saveDesc: "Menyimpan data...",
    reportBtn: "Laporan",

    //form
    productName: "Nama Produk",
    productCategory: "Kategori Produk",
    productUnit: "Satuan Produk",
    productSize: "Ukuran Produk",
    productPackage: "Kemasan Produk",
    productMinimumStock: "Stok Minimum",
    productDescription: "Deskripsi Produk",
    productImage: "Gambar Produk",
    expiredDate: "Tanggal Kadaluarsa",
    note: "Keterangan",
    notesDesc: "Ketik sesuatu (opsional)",
    chooseProduct: "Pilih Produk",
    choose: "Pilih",
    imageDesc: "Biarkan kosong jika tidak ingin mengubah gambar",

    //form title
    formEditProduct: "Edit Data Produk",
    formInventory: "Tambah Data Barang Masuk",
    formEditInventory: "Edit Data Barang Masuk",
    formDistribution: "Tambah Data Distribusi",
    formEditDistribution: "Edit Data Distribusi",
    formReturn: "Tambah Data Barang Retur",
    formStockAdjustment: "Penyesuaian Stok Gudang",

    // Return page
    returnListTitle: "Daftar Produk Retur",
    returnListDesc: "Produk yang dikembalikan sehingga masuk kembali ke stok gudang",
    damagedListTitle: "🚫 Daftar Produk Rusak",
    damagedListDesc: "Produk yang dikembalikan karena rusak (tidak ditambahkan ke stok gudang)",
    noDamagedData: "Tidak ada data barang rusak",
    deleteConfirmReturn: "Apakah Anda yakin ingin menghapus data return ini?",
    deleteReturnSuccess: "Data return berhasil dihapus",
    deleteReturnFailed: "Gagal menghapus data return",

    // Notification
    expiredToday: "Kadaluarsa Hari Ini!",
    alreadyExpired: "Sudah Kadaluarsa!",
    warning: "Peringatan!",
    attention: "Perhatian",
    expiredAgo: "sudah kadaluarsa {days} hari yang lalu",
    expiresToday: "kadaluarsa hari ini",
    expiresIn: "akan kadaluarsa dalam {days} hari",

    // Distribution validation
    noInventoryData: "Tidak dapat membuat data distribusi. Silakan tambahkan data barang masuk terlebih dahulu di menu Inventori.",
    addInventoryFirst: "Tambahkan data barang masuk terlebih dahulu",

    // Stock Adjustment
    stockAdjustmentTitle: "Penyesuaian Stok Gudang",
    stockAdjustmentDesc: "Kelola dan sesuaikan stok produk di gudang",
    stockAdjustmentHistory: "Riwayat Penyesuaian Stok Gudang",
    startAdjustment: "+ Mulai Penyesuaian",
    loadingInventory: "Memuat data inventori...",
    tryAgain: "Coba Lagi",
    fetchError: "Gagal mengambil data dari server.",
    loadError: "Terjadi kesalahan saat memuat data.",

    // Table Headers - Return
    returnDate: "Tanggal Return",
    buyerNameDistribution: "Nama Pemesan (Distribusi)",
    noReturnData: "Tidak ada data return",

    // Table Headers - Stock Adjustment
    systemStock: "Stok Sistem",
    warehouseStock: "Stok Gudang",
    difference: "Selisih",
    condition: "Kondisi",
    noStockAdjustmentData: "Tidak ada data penyesuaian stok",

    // Table Headers - Inventory
    noInventoryDataTable: "Belum ada data.",

    // Pagination - Alternative
    afterThis: "Setelahnya",

    // Nav Laporan
    reportInventory: "Laporan Inventori",
    reportDistribution: "Laporan Distribusi",
    reportReturn: "Laporan Return",
    reportStockAdjustment: "Laporan Penyesuaian Stok",

    // Report Pages - Common
    downloadCSV: "📄 Unduh CSV",
    downloadPDF: "📄 Unduh PDF",
    dateFrom: "Dari:",
    dateTo: "Sampai:",
    reset: "✕ Reset",
    showingData: "Menampilkan {filtered} dari {total} data",
    noData: "Tidak ada data",
    allTime: "Semua Waktu",
    start: "Awal",
    end: "Akhir",
    unitSuffix: "unit",
    productSuffix: "produk",
    itemSuffix: "item",
    buyerSuffix: "pemesan",

    // Report Recap Labels
    totalData: "Total Data:",
    totalIncoming: "Total Barang Masuk:",
    totalOutgoing: "Total Barang Keluar:",
    totalReturn: "Total Return:",
    totalProducts: "Jumlah Produk:",
    totalBuyers: "Jumlah Pemesan:",
    uniqueProducts: "Produk Unik:",
    stockShort: "Stok Kurang:",
    stockExcess: "Stok Lebih:",

    // Report Page Titles
    reportInventoryTitle: "Laporan Inventori Produk",
    reportDistributionTitle: "Laporan Distribusi Produk",
    reportReturnTitle: "Laporan Barang Retur",
    reportAdjustmentTitle: "Laporan Penyesuaian Stok Gudang (Tidak Sesuai)",

    // Report Table Headers
    size: "Ukuran",
    packaging: "Kemasan",
    buyer: "Pemesan",
    expiredDateShort: "Kadaluwarsa",
    noMatchingData: "Tidak ada data tidak sesuai",
  },
  en: {
    // Header
    headerTitle: "Inventory and Distribution Management App for L' Arbre Seho Products",
    
    // Sidebar Menu
    menu: "MENU",
    home: "Home",
    product: "Product",
    report: "Report",
    settings: "Settings",
    logout: "Logout",
    logoutConfirm: "Are you sure you want to logout?",
    poweredBy: "Powered by : PT. Rumah Seho Nusantara",
    
    // Login Page
    loginTitle: "Inventory and Distribution Management App for L' Arbre Seho Products",
    loginSubtitle: "PT. Rumah Seho Nusantara",
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    login: "Login",
    processing: "Processing...",
    emailPasswordRequired: "Email and password are required",
    
    // Common
    loading: "Loading...",
    date: "Date",
    quantity: "Quantity",
    method: "Method",
    status: "Status",
    total: "Total",
    shipmentMethod: "Shipment Method",
    shipmentStatus: "Shipment Status",
    nameBuyer: "Buyer Name",
    productCode: "Product Code",
    searchProduct: "Search Product...",
    searchDistribution: "Search Distribution Data...",
    pages: "Page",
    of: "of",
    next: "Next",
    previous: "Previous",

    //Dashboard
    greeting: "Welcome",
    loadingDashboard: "Loading dashboard...",
    graphicDashboard: "Inventory & Distribution Graph",
    monthThis: "This Month",
    filterProduct: "Filter Product",
    allProduct: "All Product",
    noData: "No Data to display.",
    inventory: "Inventory",
    distribution: "Distribution",
    notification: "Notification",
    noExpiredData: "No expired data in the next 30 days.",
    monthlySummaryTitle: "Monthly Summary",
    totalProducts: "Total Products",
    totalIncoming: "Total Incoming",
    totalDistribution: "Total Distribution",
    totalReturn: "Total Return",
    totalAdjustment: "Total Adjustment",
    infoDistributionProduct: "Information Distribution Product",
    seeMore: "See More",
    noDataDistribution: "No data distribution",

    // inventory page
    inventoryTitle: "Inventory Data Preview",
    inventoryDesc: "showing the current stock quantity.",
    minimumStock: "Minimum",
    stockNow: "Now",
    inventoryHistoryTitle: "Incoming Goods History",

    // distribution page
    distributionTitle: "Distribution Data Preview",
    distributionDesc: "showing the current distribution data with shipment status of Processed and In Transit.",
    distributionHistoryTitle: "Distribution History",

    // product nav
    inventoryBtn: "Inventory Product",
    distributionBtn: "Distribution Product",
    returnBtn: "Return Product",
    stockAdjustmentBtn: "Stock Adjustment",

    // buttons
    addProduct: "Add Product",
    addData: "Add Data",
    addInventoryData: "Incoming Goods",
    historyData: "Data History",
    saveBtn: "Save",
    saveDesc: "Saving data...",
    reportBtn: "Report",

    //form
    requiredField: "Required field",
    productName: "Product Name",
    productCategory: "Product Category",
    productUnit: "Product Unit",
    productSize: "Product Size",
    productPackage: "Product Package",
    productMinimumStock: "Minimum Stock",
    productDescription: "Product Description",
    productImage: "Product Image",
    expiredDate: "Expired Date",
    note: "Notes",
    notesDesc: "Type something (optional)",
    chooseProduct: "Choose Product",
    choose: "Choose",
    imageDesc: "Leave blank if you don't want to change the image",

    //form title
    formEditProduct: "Edit Product",
    formInventory: "Add Incoming Goods",
    formEditInventory: "Edit Incoming Goods",
    formDistribution: "Add Distribution",
    formEditDistribution: "Edit Distribution",
    formReturn: "Add Return",
    formStockAdjustment: "Stock Adjustment",

    // Return page
    returnListTitle: "Return Product List",
    returnListDesc: "Products that are returned and added back to warehouse stock",
    damagedListTitle: "🚫 Damaged Product List",
    damagedListDesc: "Products that are returned due to damage (not added to warehouse stock)",
    noDamagedData: "No damaged product data",
    deleteConfirmReturn: "Are you sure you want to delete this return data?",
    deleteReturnSuccess: "Return data deleted successfully",
    deleteReturnFailed: "Failed to delete return data",

    // Notification
    expiredToday: "Expires Today!",
    alreadyExpired: "Already Expired!",
    warning: "Warning!",
    attention: "Attention",
    expiredAgo: "expired {days} days ago",
    expiresToday: "expires today",
    expiresIn: "will expire in {days} days",

    // Distribution validation
    noInventoryData: "Cannot create distribution data. Please add incoming goods data first in the Inventory menu.",
    addInventoryFirst: "Add incoming goods data first",

    // Stock Adjustment
    stockAdjustmentTitle: "Stock Adjustment",
    stockAdjustmentDesc: "Manage and adjust product stock in warehouse",
    stockAdjustmentHistory: "Stock Adjustment History",
    startAdjustment: "+ Start Adjustment",
    loadingInventory: "Loading inventory data...",
    tryAgain: "Try Again",
    fetchError: "Failed to fetch data from server.",
    loadError: "An error occurred while loading data.",

    // Table Headers - Return
    returnDate: "Return Date",
    buyerNameDistribution: "Buyer Name (Distribution)",
    noReturnData: "No return data",

    // Table Headers - Stock Adjustment
    systemStock: "System Stock",
    warehouseStock: "Warehouse Stock",
    difference: "Difference",
    condition: "Condition",
    noStockAdjustmentData: "No stock adjustment data",

    // Table Headers - Inventory
    noInventoryDataTable: "No data available.",

    // Pagination - Alternative
    afterThis: "Next",

    // Nav Laporan
    reportInventory: "Inventory Report",
    reportDistribution: "Distribution Report",
    reportReturn: "Return Report",
    reportStockAdjustment: "Stock Adjustment Report",

    // Report Pages - Common
    downloadCSV: "📄 Download CSV",
    downloadPDF: "📄 Download PDF",
    dateFrom: "From:",
    dateTo: "To:",
    reset: "✕ Reset",
    showingData: "Showing {filtered} of {total} data",
    noData: "No data",
    allTime: "All Time",
    start: "Start",
    end: "End",
    unitSuffix: "units",
    productSuffix: "products",
    itemSuffix: "items",
    buyerSuffix: "buyers",

    // Report Recap Labels
    totalData: "Total Data:",
    totalIncoming: "Total Incoming:",
    totalOutgoing: "Total Outgoing:",
    totalReturn: "Total Return:",
    totalProducts: "Total Products:",
    totalBuyers: "Total Buyers:",
    uniqueProducts: "Unique Products:",
    stockShort: "Stock Short:",
    stockExcess: "Stock Excess:",

    // Report Page Titles
    reportInventoryTitle: "Product Inventory Report",
    reportDistributionTitle: "Product Distribution Report",
    reportReturnTitle: "Product Return Report",
    reportAdjustmentTitle: "Stock Adjustment Report (Discrepancies)",

    // Report Table Headers
    size: "Size",
    packaging: "Packaging",
    buyer: "Buyer",
    expiredDateShort: "Expiry Date",
    noMatchingData: "No discrepancy data",
  }
};

export const getTranslation = (locale, key) => {
  return translations[locale]?.[key] || translations['id'][key] || key;
};

export default translations;
