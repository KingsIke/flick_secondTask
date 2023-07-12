import express from 'express';
import { cacIdentity } from '../controller/Identity/cacIdentity';


const router = express.Router()
 

router.post( '/cac', cacIdentity)
export default router