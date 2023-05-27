
import express from 'express';
import { creatingRDPhone } from '../controller/Identity/radarphoneIdentity';
import { creatingRDBvn } from '../controller/Identity/radarbvnIdentity';


const router = express.Router();

router.post( '/radar_bvn', creatingRDBvn
)
export default router