import express from 'express';
import { creatingKarma } from '../controller/Identity/karamIdentity';

const router = express.Router()
 

router.post( '/karma', creatingKarma )
export default router