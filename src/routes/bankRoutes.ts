import express from 'express';
import { bankAccountIdentity } from '../controller/Identity/bank_accountIdentity';


const router = express.Router()
 

router.post( '/bank_account', bankAccountIdentity)
export default router