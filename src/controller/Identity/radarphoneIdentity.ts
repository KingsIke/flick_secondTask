// import express, { Request, Response, NextFunction } from "express";
// import { v4 as uuidv4 } from "uuid";
// import { RadarPhoneValidator, options } from "../../utils/utils";
// import { sendRequest } from "../../config/osyterUrl";
// import { RDPHONEInstance } from "../../schema/radarphone";
// import { RDPhoneIdentityInstance } from "../../schema/modules/radarphoneInstance";

// export const radarPhoneIdentity = async (req: Request, res: Response) => {
//   try {
//     const endpoint = "/identity-verification?data_type=radar_phone";
//     const method = "POST";
//     const { data_type, radar_phone } = req.body;

//     const identityRDPhone = RadarPhoneValidator.validate(req.body, options);
//     if (identityRDPhone.error) {
//       return res
//         .status(400)
//         .json({ error: identityRDPhone.error.details[0].message });
//     }

//     const existingRDPhone = await RDPhoneIdentityInstance.findOne({
//       where: {
//         radarphoneInstanceId: req.body.radar_phone,
//       },
//     });

//     if (existingRDPhone) {;
//       return res.json({
//         response : existingRDPhone,
//       });
//     }

//     const createnewRDPhone = await RDPHONEInstance.create({
//       idempotency_ref: uuidv4(),
//       data_type,
//       radar_phone,
//     });
//     const response = await sendRequest(endpoint, method, createnewRDPhone);

//     if (response.success) {
//       const savedResponse = await RDPhoneIdentityInstance.create({
//         id: createnewRDPhone.idempotency_ref,
//         radarphoneInstanceId: createnewRDPhone.radar_phone, 
//         data: response.data,
//       });

//       return res.status(201).json({ response: savedResponse });
//     } else {
//       await createnewRDPhone.destroy();
//       throw new Error(response.msg);
//     }
//   } catch (error: any) {
//     console.error("Error getting Crc:", error.message);
//     res.status(500).json({ error: "Wrong Data Input" });
//   }
// };
