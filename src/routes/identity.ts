import express from 'express';
import { verification } from '../controller/Identity/identity';
// import {
//     //  addressIdentity,
//      almIdentity, bankAccountIdentity, basicPhoneIdentity, bvnIdentity, cacIdentity, crcIdentity, creditPremuimIdentity, driverLicenceIdentity, ecosystemIdentity, firstCentralIdentity, karmaIdentity, ninIdentity, phoneIdentity, radarBvnIdentity, radarPhoneIdentity, verification, votersCardIdentity 
//     } from '../controller/Identity/identity';

const router = express.Router();

// // router.post( '/address', addressIdentity)
// router.post( '/aml_identity', almIdentity)
// router.post( '/bank_account_identity', bankAccountIdentity)
// router.post( '/phone_basic_identity', basicPhoneIdentity)
// router.post( '/bvn_identity', bvnIdentity)
// router.post( '/cac_identity', cacIdentity)
// router.post( '/crc_identity', crcIdentity)
// router.post( '/credit_premium_identity', creditPremuimIdentity)
// router.post( '/driverlicence_identity', driverLicenceIdentity)
// router.post( '/ecosystem_identity', ecosystemIdentity)
// router.post( '/credit_first_central', firstCentralIdentity)
// router.post( '/karma_identity', karmaIdentity )
// router.post( '/nin_identity', ninIdentity)
// router.post( '/phone_identity', phoneIdentity)
// router.post( '/radar_bvn_identity', radarBvnIdentity)
// router.post( '/radar_phone_identity', radarPhoneIdentity)
// router.post( '/voters_card_identity', votersCardIdentity)
router.post( '/testing', verification)

export default router;
