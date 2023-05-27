import express from 'express';
import { creatingBankAccount } from '../controller/Identity/bank_accountIdentity';
import { creatingDriverlicence } from '../controller/Identity/driverlicenceIdentity';


const router = express.Router()
 

router.post( '/drivers_license', creatingDriverlicence)
export default router