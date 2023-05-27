import express from 'express';
import { creatingPremuim } from '../controller/Identity/credit_premium';

const router = express.Router()
   
    router.post( '/credit_premium', creatingPremuim)
export default router