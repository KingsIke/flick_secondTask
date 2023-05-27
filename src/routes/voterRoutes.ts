import express from 'express';
import { createVotersCard } from '../controller/Identity/voterscard';


const router = express.Router()
 

router.post( '/voters_card', createVotersCard)
export default router