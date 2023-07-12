// import express, { Request, Response, NextFunction } from "express";
// import { v4 as uuidv4 } from "uuid";
// import { createCRCidentity, options } from "../../utils/utils";
// import { sendRequest } from "../../config/osyterUrl";
// import { CRCInstance } from "../../schema/crc_data";
// import { CRCIdentityInstance } from "../../schema/modules/crc_dataInstance";

// export const crcIdentity = async (req: Request, res: Response) => {
//   try {
//     const endpoint = "/identity-verification?data_type=credit_crc";
//     const method = "POST";
//     const { data_type, credit_crc } = req.body;

//     const identityCrc = createCRCidentity.validate(req.body, options);
//     if (identityCrc.error) {
//       return res
//         .status(400)
//         .json({ error: identityCrc.error.details[0].message });
//     }

//     const existingCrc = await CRCIdentityInstance.findOne({
//       where: {
//         creditcrcInstanceId: req.body.credit_crc,
//       },
//     });

//     if (existingCrc) {
//       return res.json({
//         response: existingCrc,
//       });
//     }

//     const createnewCrc = await CRCInstance.create({
//       idempotency_ref: uuidv4(),
//       data_type,
//       credit_crc,
//     });
//     const response = await sendRequest(endpoint, method, createnewCrc);

//     if (response.success) {
//       const savedResponse = await CRCIdentityInstance.create({
//         id: createnewCrc.idempotency_ref,
//         creditcrcInstanceId: createnewCrc.credit_crc, 
//         data: response.data,
//       });

//       return res.status(201).json({ response: savedResponse });
//     } else {
//       await createnewCrc.destroy();
//       throw new Error(response.msg);
//     }
//   } catch (error: any) {
//     console.error("Error getting Crc:", error.message);
//     res.status(500).json({ error: "Wrong Data Input" });
//   }
// };
