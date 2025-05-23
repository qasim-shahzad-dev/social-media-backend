import express from 'express';

import {login, signup} from "../controllers/authController";
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router();

//register route

router.post('/signup', signup)
   


router.post('/login',login);
     


export default router;