import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createNinidentity, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { NinInstance } from "../../schema/nin";

export const createNin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const endpoint = "/identity-verification?data_type=nin";
    const method = "POST";
    const { data_type, nin } = req.body;

    const identityNin = createNinidentity.validate(req.body, options);
    if (identityNin.error) {
      return res.status(400).json({
        Error: identityNin.error.details[0].message,
      });
    }

    const duplicateNin = await NinInstance.findOne({ where: { nin: nin } });

    if (duplicateNin) {
      const response = await sendRequest(endpoint, method, duplicateNin);
      return res.json({
        response,
      });
    }
    const ninCreated = await NinInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      nin,
    });
    const response = await sendRequest(endpoint, method, ninCreated);

    if (response.success) {
      return res.status(201).json({ response });
    } else {
      await ninCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Nin:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
