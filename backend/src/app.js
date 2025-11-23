import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// register routes
app.use('/api/products', productRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server berjalan di port", process.env.PORT || 5000);
});
