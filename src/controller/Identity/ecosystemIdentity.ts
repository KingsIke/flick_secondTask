import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { EcosystemValidator, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { EcosystemInstance } from "../../schema/ecosystem";

  export const creatingEcosystem = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const endpoint = "/identity-verification?data_type=ecosystem";
    const method = "POST";
    const { data_type, ecosystem } = req.body;

    const identityEcosystem = EcosystemValidator.validate(req.body, options);
    if (identityEcosystem.error) {
      return res
        .status(400)
        .json({ error: identityEcosystem.error.details[0].message });
    }

    const existingEcosystem = await EcosystemInstance.findOne({
      where: {
        "ecosystem.bvn": ecosystem.bvn,
      },
    });

    if (existingEcosystem) {
      const response = await sendRequest(endpoint, method, existingEcosystem);
      return res.json({
        response,
      });
    }
    const createnewEcosystem = await EcosystemInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      ecosystem,
    });
    const response = await sendRequest(endpoint, method, createnewEcosystem);

    if (response.success) {
      return res.status(201).json({ response });
    } else {
      await createnewEcosystem.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Crc:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
