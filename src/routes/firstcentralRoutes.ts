import express from 'express';
import { creatingCreditCentral } from '../controller/Identity/first_centralIdentity';

const router = express.Router()
 

router.post( '/credit_first_central', creatingCreditCentral)
export default router