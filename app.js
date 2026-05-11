import express from 'express';
import path from "path"
import cors from 'cors';
import ProductRoutes from './routes/product.routes.js'
import CategoryRoutes from './routes/category.routes.js'
import ImageRoutes from "./routes/image.routes.js" 
import errorHandler from './middlewares/errorHandler.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")))

// http://localhost:3000/produtos
app.use("/produtos", ProductRoutes);
app.use("/categorias", CategoryRoutes);
app.use("/images", ImageRoutes);


app.use(errorHandler)

export default app;