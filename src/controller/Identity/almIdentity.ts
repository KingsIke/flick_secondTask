import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { AmlDataTypeValidator, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { AlmInstance } from "../../schema/aml";
import { ResponseInstance } from "../../schema/modules/amlInstance";

export const almIdentity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data_type, aml } = req.body;
    const endpoint = "/identity-verification?data_type=aml";

    const method = "POST";

    const identityAlm = AmlDataTypeValidator.validate(req.body, options);
    if (identityAlm.error) {
      return res.status(400).json({
        Error: identityAlm.error.details[0].message,
      });
    }

    const duplicateAlm = await ResponseInstance.findOne({
      where: {
        almInstanceId: req.body.alm
      },
    });

    if (duplicateAlm) {
        return res.json({
          data:duplicateAlm,
        });
      
    }
    const amlCreated = await AlmInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      aml,
    });

    const response = await sendRequest(endpoint, method, amlCreated);
    if (response.success) {
      const savedResponse = await ResponseInstance.create({
        id: amlCreated.idempotency_ref,
        almInstanceId: amlCreated.aml, 
        data: response.data,
      });
      return res
        .status(201)
        .json({  response:savedResponse });
    } else {
      await amlCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Aml:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
