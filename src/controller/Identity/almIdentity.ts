import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { AmlDataTypeValidator, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { AlmInstance } from "../../schema/aml";

export const createAlm = async (
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

    //   /// Duplicates
    const duplicateAlm = await AlmInstance.findOne({
      where: {
        "aml.date_of_birth": aml.date_of_birth,
        "aml.first_name": aml.first_name,
        "aml.last_name": aml.last_name,
      },
    });

    if (duplicateAlm) {
      if (duplicateAlm) {
        const response = await sendRequest(endpoint, method, duplicateAlm);
        return res.json({
          response,
        });
      }
    }
    const amlCreated = await AlmInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      aml,
    });

    const response = await sendRequest(endpoint, method, amlCreated);
    if (response.success) {
      return res
        .status(201)
        .json({  response });
    } else {
      await amlCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Aml:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
