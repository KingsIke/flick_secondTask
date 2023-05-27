import express from 'express';
import { createPhone } from '../controller/Identity/phoneIdentity';


const router = express.Router()
 

router.post( '/phone', createPhone)
export default router