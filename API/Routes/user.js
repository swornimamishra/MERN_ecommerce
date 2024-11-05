import express from 'express';
import { login, register, users,profile } from '../Controllers/user.js';
import { Authenticated } from '../Middlewares/auth.js';



const router = express.Router();

// register user
router.post('/register',register) //=>/api/user/register

// login user
router.post('/login',login)


// get all users
router.get('/all',users)

// get user frofile
router.get("/profile", Authenticated, profile);


export default router