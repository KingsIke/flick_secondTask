// import { Request, Response, NextFunction } from "express";
// import { v4 as uuidv4 } from "uuid";
// import { createBvnidentity, options } from "../../utils/utils";
// import { sendRequest } from "../../config/osyterUrl";
// import { BvnInstance } from "../../schema/bvn";
// import { BVNIdentityInstance } from "../../schema/modules/bvnInstance"

// export const bvnIdentity = async (
//   req: Request,  
//   res: Response,
//   next: NextFunction
// ) => {


//   try {
//     const endpoint = "/identity-verification";
//     const method = "POST";
//     const { data_type, bvn } = req.body;

//     const identityBvn = createBvnidentity.validate(req.body, options);
//     if (identityBvn.error) {
//       return res.status(400).json({
//         Error: identityBvn.error.details[0].message,
//       });
//     }


//       const Duplicate_result = await BVNIdentityInstance.findOne({
//         where : {
//           bvnInstanceId :req.body.bvn
//         }
//       })
//        if (Duplicate_result) {
//         return res.json({data: Duplicate_result})
//        }


//     const bvnCreated = await BvnInstance.create({
//       idempotency_ref: uuidv4(),
//       data_type,
//       bvn,
//     });

//     const response = await sendRequest(endpoint, method, bvnCreated);

//     if (response.success) {
//       const savedResponse = await BVNIdentityInstance.create({
//         id: bvnCreated.idempotency_ref,
//         bvnInstanceId: bvnCreated.bvn, 
//         data: response.data,
//       });

//       return res.status(201).json({ response: savedResponse });
//     } else {
//       await bvnCreated.destroy();
//       throw new Error(response.msg);
//     }
//   } catch (error: any) {
//     console.error("Error getting bvn:", error.message);
//     res.status(500).json({ error});
//   }
// };




