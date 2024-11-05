import express from 'express'
import { addproduct, getProducts, getProductById, updateProductById, deleteProductById } from '../Controllers/product.js';


const router = express.Router();

// add product
router.post('/add',addproduct);

// get all product
router.get('/all',getProducts);

// get productbyId
router.get('/:id',getProductById)

// Product update By Id
router.put('/:id',updateProductById) 

// delete product by id
router.delete('/:id',deleteProductById)

export default router