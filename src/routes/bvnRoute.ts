import express from 'express';
import { createBvn } from '../controller/Identity/bvnIdentity';


const router = express.Router()
 

router.post( '/bvn', createBvn)
export default router