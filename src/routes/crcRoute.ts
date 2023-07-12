import express from 'express';
import { crcIdentity } from '../controller/Identity/crcIdentity';


const router = express.Router()
 

router.post( '/credit', crcIdentity)
export default router