import express from 'express';
// import { createCustomer } from '../controller/customer';
import { ninIdentity } from '../controller/Identity/ninIdentity';


const router = express.Router()
 

router.post( '/nin', ninIdentity)
export default router