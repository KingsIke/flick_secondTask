
import express from 'express';
import { radarPhoneIdentity } from '../controller/Identity/radarphoneIdentity';


const router = express.Router();

router.post( '/radar_phone_identity', radarPhoneIdentity
)
export default router