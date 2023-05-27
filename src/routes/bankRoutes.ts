import express from 'express';
import { creatingBankAccount } from '../controller/Identity/bank_accountIdentity';


const router = express.Router()
 

router.post( '/bank_account', creatingBankAccount)
export default router