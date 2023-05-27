import express from 'express';
import { createCustomer } from '../controller/customer';

const router = express.Router()
 

router.post( '/signup', createCustomer)
export default router