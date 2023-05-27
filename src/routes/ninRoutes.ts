import express from 'express';
// import { createCustomer } from '../controller/customer';
import { createNin } from '../controller/Identity/ninIdentity';


const router = express.Router()
 

router.post( '/nin', createNin)
export default router