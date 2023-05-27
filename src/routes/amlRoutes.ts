import express from 'express';
import { createAlm } from '../controller/Identity/almIdentity';


const router = express.Router()
 

router.post( '/aml', createAlm)
export default router