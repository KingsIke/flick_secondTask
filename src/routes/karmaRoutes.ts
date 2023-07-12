import express from 'express';
import { karmaIdentity } from '../controller/Identity/karamIdentity';

const router = express.Router()
 

router.post( '/karma_identity', karmaIdentity )
export default router