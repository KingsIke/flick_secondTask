// import { Request, Response, NextFunction } from "express";
// import { v4 as uuidv4 } from "uuid";
// import { AddressValidator, options } from "../../utils/utils";
// import { sendRequest } from "../../config/osyterUrl";
// import { AddressInstance } from "../../schema/address";
// import { AddressIdentityInstance } from "../../schema/modules/addressInstance"


// export const addressIdentity = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const endpoint = "/identity-verification?data_type=address";
//     const method = "POST";
//     const { data_type, address } = req.body;

//     const identityAddress = AddressValidator.validate(req.body, options);
//     if (identityAddress.error) {
//       return res
//         .status(400)
//         .json({ error: identityAddress.error.details[0].message });
//     }

//     const existingAddress = await AddressIdentityInstance.findOne({
//       where: {
//         addressInstanceId: req.body.address,
//       },
//     });

//     if (existingAddress) {
//       return res.json({
//         data:existingAddress,
//       });
//     }

//     const createnewAddress = await AddressInstance.create({
//       idempotency_ref: uuidv4(),
//       data_type,
//       address,
//     });
//     const response = await sendRequest(endpoint, method, createnewAddress);

//     if (response.success) {
//       const savedResponse = await AddressIdentityInstance.create({
//         id: createnewAddress.idempotency_ref,
//         addressInstanceId: createnewAddress.address, 
//         data: response.data,
//       });
//       return res
//       .status(201)
//       .json({ response });
//   } else {

//     await createnewAddress.destroy();
//     throw new Error(response.msg);
//   }
   
//   } catch (error: any) {
//     console.error("Error getting Address:", error.message);
//     res.status(500).json({ error: "Wrong Data" });
//   }
// };
