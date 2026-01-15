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
  }
};

export const getTranslation = (locale, key) => {
  return translations[locale]?.[key] || translations['id'][key] || key;
};

export default translations;
