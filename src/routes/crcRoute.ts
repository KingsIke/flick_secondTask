import express from 'express';
import { creatingCRC } from '../controller/Identity/crcIdentity';


const router = express.Router()
 

router.post( '/credit', creatingCRC)
export default router