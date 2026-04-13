import express from 'express';
import cors from 'cors';
import ProductRoutes from './routes/product.routes.js'
import CategoryRoutes from './routes/category.routes.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express();
app.use(cors());
app.use(express.json());

// http://localhost:3000/produtos
app.use("/produtos", ProductRoutes);
app.use("/categorias", CategoryRoutes);

app.use(errorHandler)

export default app;