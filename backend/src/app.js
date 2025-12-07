import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

import routerUsers from './routes/UserRoute.js';
import routerProducts from './routes/ProductRoute.js';

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
app.use("/api/sehub/products/uploads", express.static(path.join(__dirname, "src", "public", "uploads")));

// register routes
app.use('/api/sehub/products', routerProducts);
app.use('/api/sehub/users', routerUsers);

// start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server berjalan di port", process.env.PORT || 5000);
});
