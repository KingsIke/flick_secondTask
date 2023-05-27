import express from 'express';
import { creatingAddress } from '../controller/Identity/addressIdentity';


const router = express.Router()
 

router.post( '/address', creatingAddress)
export default router