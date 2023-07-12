import express from 'express';
import { almIdentity } from '../controller/Identity/almIdentity';


const router = express.Router()
 

router.post( '/aml', almIdentity)
export default router