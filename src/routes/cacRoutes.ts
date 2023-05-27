import express from 'express';
import { createCAC } from '../controller/Identity/cacIdentity';


const router = express.Router()
 

router.post( '/cac', createCAC)
export default router