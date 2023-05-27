import express from 'express';
import { creatingEcosystem } from '../controller/Identity/ecosystemIdentity';


const router = express.Router()
 

router.post( '/ecosystem', creatingEcosystem)
export default router