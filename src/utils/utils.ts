// import Joi from "joi";

// export const createBvnidentity  = Joi.object().keys({
//     data_type: Joi.string().required(),
//     bvn: Joi.string().length(11).required()
// })

// export const createNinidentity  = Joi.object().keys({
//   data_type: Joi.string().required(),
//   nin: Joi.string().length(11).required()
// })

// export const createPhoneidentity  = Joi.object().keys({
//   data_type: Joi.string().valid('phone').required(),
//   phone: Joi.string().length(11).required()
// })

// export const createVotersCardidentity  = Joi.object().keys({
//   data_type: Joi.string().valid('voters_card').required(),
//   voters_card: Joi.string().length(10).required()
// })

// export const createCRCidentity  = Joi.object().keys({
//   data_type: Joi.string().valid('credit_crc').required(),
//   credit_crc: Joi.object({
//     bvn: Joi.string().length(11).required()
//   }).required()
// })

// export const createFirstCreditidentity  = Joi.object().keys({
//   data_type: Joi.string().valid('credit_first_central').required(),
//   credit_first_central: Joi.object({
//     bvn: Joi.string().length(11).required()
//   }).required()
// })


// export const createCreditPremiumidentity  = Joi.object().keys({
//   data_type: Joi.string().valid('credit_premium').required(),
//   credit_premium: Joi.object({
//     bvn: Joi.string().length(11).required()
//   }).required()
// })



// export const AmlDataTypeValidator   = Joi.object().keys({
//   data_type: Joi.string().valid('aml').required(),
//   aml: Joi.object({
//     date_of_birth: Joi.date().required(),
//     first_name: Joi.string().required(),
//     last_name: Joi.string().required()
//   }).required()
// })



// export const CACValidator  = Joi.object().keys({
//   data_type: Joi.string().valid('cac').required(),
//   cac: Joi.object({
//     rc_number: Joi.string().required(),
//     company_name: Joi.string().required(),
//     company_type: Joi.string().required()
//   }).required()
// })

// export const BankAccountValidator  = Joi.object().keys({
//   data_type: Joi.string().valid('bank_account').required(),
//   bank_account: Joi.object({
//     account_number: Joi.string().length(10).required(),
//     bank_code: Joi.string().required()
//   }).required()
// })


// export const DriversValidator  = Joi.object().keys({
//   data_type: Joi.string().valid('drivers_license').required(),
//   drivers_license: Joi.object({
//     license_number: Joi.string().required()
//   }).required()
// })  

// export const AddressValidator  = Joi.object().keys({
//   data_type: Joi.string().valid('address').required(),
//   address: Joi.object({
//     phone: Joi.string().length(11).required()
//   }).required()
// })


// export const EcosystemValidator  = Joi.object().keys({
//   data_type: Joi.string().valid('ecosystem').required(),
//   ecosystem: Joi.object({
//     bvn: Joi.string().length(11).required()
//   }).required()
// })

// export const KarmaValidator  = Joi.object().keys({
//   data_type: Joi.string().valid('karma').required(),
//   karma: Joi.object({
//     bvn: Joi.string().length(11).required()
//   }).required()
// })

// export const RadarPhoneValidator  = Joi.object().keys({
//   data_type: Joi.string().valid('radar_phone').required(),
//   radar_phone: Joi.object({
//     phone: Joi.string().required()
//   }).required()
// })


// export const RadarBvnValidator  = Joi.object().keys({
//   data_type: Joi.string().valid('radar_bvn').required(),
//   radar_bvn: Joi.object({
//     bvn: Joi.string().length(11).required()
//   }).required()
// })

// export const BasicPhoneValidator  = Joi.object().keys({
//   data_type: Joi.string().valid('phone_basic').required(),
//   phone_basic: Joi.string().required()

// })

// export  const BodyValidator = Joi.object({
//   data_type: Joi.string().required(),

//     data: Joi.alternatives().try(
//       Joi.string(),
//       Joi.object({
//         phone: Joi.string().length(11).required(),
     
//       })
//     ).required()
//   });



// export const options = {
//     abortEarly:
//       false,
//     errors: {
//       wrap: { label: "" },
//     },
//   };









//  function getValidator(data_type:any) {
//     switch (data_type) {
//       case 'bvn':
//         return createBvnidentity;
//       case 'nin':
//         return createNinidentity;
//       case 'phone':
//         return createPhoneidentity;
//       case 'voters_card':
//         return createVotersCardidentity;
//       case 'credit_crc':
//         return createCRCidentity;
//       case 'credit_first_central':
//         return createFirstCreditidentity;
//       case 'credit_premium':
//         return createCreditPremiumidentity;
//       case 'aml':
//         return AmlDataTypeValidator;
//       case 'cac':
//         return CACValidator;
//       case 'bank_account':
//         return BankAccountValidator;
//       case 'drivers_license':
//         return DriversValidator;
//       case 'address':
//         return AddressValidator;
//       case 'ecosystem':
//         return EcosystemValidator;
//       case 'karma':
//         return KarmaValidator;
//       case 'radar_phone':
//         return RadarPhoneValidator;
//       case 'radar_bvn':
//         return RadarBvnValidator;
//       case 'phone_basic':
//         return BasicPhoneValidator;
//       default:
//         throw new Error('Invalid data_type.');
//     }
//   }