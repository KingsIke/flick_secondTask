import express from 'express';
import { bvnIdentity } from '../controller/Identity/bvnIdentity';


const router = express.Router()
 

router.post( '/bvn', bvnIdentity)
export default router