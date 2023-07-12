import express from 'express';
import { addressIdentity } from '../controller/Identity/addressIdentity';


const router = express.Router()
 

router.post( '/address', addressIdentity)
export default router