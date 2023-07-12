// import express, { Request, Response, NextFunction } from "express";
// import { v4 as uuidv4 } from "uuid";
// import {
//   DriversValidator,
//   options,
// } from "../../utils/utils";
// import { sendRequest } from "../../config/osyterUrl";
// import { DriverInstance } from "../../schema/driverslicense";
// import { DriverIdentityInstance } from "../../schema/modules/driverslicenseInstance";

// export const driverLicenceIdentity = async (req: Request, res: Response) => {
//   try {
//     const endpoint = "/identity-verification?data_type=drivers_license";
//     const method = "POST";
//     const { data_type, drivers_license } = req.body;

//     const identityDriver = DriversValidator.validate(req.body, options);
//     if (identityDriver.error) {
//       return res
//         .status(400)
//         .json({ error: identityDriver.error.details[0].message });
//     }

//     const existingLicense = await DriverIdentityInstance.findOne({
//       where: {
//         driverlicInstanceId: req.body.drivers_license,
//       },
//     });

//     if (existingLicense) {
//       return res.json({
//         response: existingLicense,
//       });
//     }

//     const createnewLicense = await DriverInstance.create({
//       idempotency_ref: uuidv4(),
//       data_type,
//       drivers_license,
//     });
//     const response = await sendRequest(endpoint, method, createnewLicense);

//     if (response.success) {
//       const savedResponse = await DriverIdentityInstance.create({
//         id: createnewLicense.idempotency_ref,
//         driverlicInstanceId: createnewLicense.drivers_license, 
//         data: response.data,
//       });

//       return res.status(201).json({ response: savedResponse });
//     } else {
//       await createnewLicense.destroy();
//       throw new Error(response.msg);
//     }
//   } catch (error: any) {
//     console.error("Error getting Crc:", error.message);
//     res.status(500).json({ error: "Wrong Data Input" });
//   }
// };
