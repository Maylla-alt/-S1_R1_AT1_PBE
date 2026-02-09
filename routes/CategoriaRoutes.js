import express from 'express';
import CategoriaControllers from '../controllers/CategoriaControllers.js'

const router = express.Router();

router.get("/", CategoriaControllers.index)
router.post("/", CategoriaControllers.store)
router.put("/:id", CategoriaControllers.update)
router.delete("/:id", CategoriaControllers.destroy)

export default router;