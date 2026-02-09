import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

// Initialize SQLite database
import initializeDatabase from './config/initDb.js';

import routerUsers from './routes/UserRoute.js';
import routerProducts from './routes/ProductRoute.js';
import routerInventory from './routes/InventoryRoute.js';
import routerMasterData from './routes/MasterDataRoute.js';
import routerDistribution from './routes/DistributionRoute.js';
import routerDashboard from './routes/DashboardRoute.js';
import routerReturn from './routes/ReturnRoute.js';
import routerStockAdjustment from './routes/StockAdjustmentRoute.js';
import routerReport from './routes/ReportRoute.js';

dotenv.config();

const app = express();

// untuk handle path absolut
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware dasar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve file gambar (HARUS DITARUH DI ATAS ROUTES)
app.use("/uploads", express.static(path.join(process.cwd(), "src/public/uploads")));

// register routes
app.use('/api/sehub/products', routerProducts);
app.use('/api/sehub/users', routerUsers);
app.use('/api/sehub/inventory', routerInventory);
app.use('/api/sehub/master', routerMasterData);
app.use('/api/sehub/distribution', routerDistribution);
app.use('/api/sehub/dashboard', routerDashboard);
app.use('/api/sehub/return', routerReturn);
app.use('/api/sehub/stock-adjustment', routerStockAdjustment);
app.use('/api/sehub/report', routerReport);

// Initialize database and start server
(async () => {
  await initializeDatabase();
  
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server berjalan di port", process.env.PORT || 5000);
  });
})();


