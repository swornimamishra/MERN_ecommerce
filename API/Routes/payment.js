import express from 'express'
import { allOrders, checkout, userOrder, verify } from "../Controllers/payment.js";
import {Authenticated} from '../Middlewares/auth.js'


const router = express.Router();

// checkout
router.post('/checkout',checkout);

// verify payment & save to db
router.post('/verify-payment',verify)

// user order
router.get("/userorder", Authenticated, userOrder);

// user order
router.get("/orders",  allOrders);

export default router