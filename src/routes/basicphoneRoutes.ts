import express from 'express';
import { creatingBPhone } from '../controller/Identity/basicphoneIdentity';


const router = express.Router()
 

router.post( '/phone_basic', creatingBPhone)
export default router