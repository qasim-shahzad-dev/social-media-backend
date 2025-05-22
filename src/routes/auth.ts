import express from 'express';

import {register, login} from "../controllers/authController";
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router();

//register route

router.post('/register', register)
   


router.post('/login',login);
     


export default router;