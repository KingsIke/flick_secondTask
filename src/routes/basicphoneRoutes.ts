import express from 'express';
import { basicPhoneIdentity } from '../controller/Identity/basicphoneIdentity';


const router = express.Router()
 

router.post( '/phone_basic', basicPhoneIdentity)
export default router