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

    //Dashboard
    greeting: "Selamat Datang",
    loadingDashboard: "Memuat data dashboard...",
    graphicDashboard: "Grafik Inventori & Distribusi",
    monthThis: "Bulan Ini",
    filterProduct: "Filter Produk",
    allProduct: "Semua Produk",
    noData: "Tidak ada data untuk ditampilkan.",
    date: "Tanggal",
    quantity: "Jumlah",
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
    nameBuyer: "Nama Pemesan",
    noDataDistribution: "Tidak ada data distribusi",
    method: "Metode",
    status: "Status",

    //inventory page
    inventoryTitle: "Pratinjau Data Inventori",
    inventoryDesc: "menampilkan jumlah stok saat ini.",
    searchProduct: "Cari Produk...",
    minimumStock: "Minimal",
    stockNow: "Sekarang",

    //buttons
    addProduct: "Tambah Produk",
    addInventoryData: "Barang Masuk",
    historyData: "Riwayat Data",
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

    //Dashboard
    greeting: "Welcome",
    loadingDashboard: "Loading dashboard...",
    graphicDashboard: "Inventory & Distribution Graph",
    monthThis: "This Month",
    filterProduct: "Filter Product",
    allProduct: "All Product",
    noData: "No Data to display.",
    date: "Date",
    quantity: "Quantity",
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
    nameBuyer: "Buyer Name",
    noDataDistribution: "No data distribution",
    method: "Method",
    status: "Status",

    // inventory page
    inventoryTitle: "Inventory Data Preview",
    inventoryDesc: "showing the current stock quantity.",
    searchProduct: "Search Product...",
    minimumStock: "Minimum",
    stockNow: "Now",

    // buttons
    addProduct: "Add Product",
    addInventoryData: "Incoming Goods",
    historyData: "History Data",
  }
};

export const getTranslation = (locale, key) => {
  return translations[locale]?.[key] || translations['id'][key] || key;
};

export default translations;
