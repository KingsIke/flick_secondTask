
import express from 'express';
import { creatingRDPhone } from '../controller/Identity/radarphoneIdentity';


const router = express.Router();

router.post( '/radar_phone', creatingRDPhone
)
export default router