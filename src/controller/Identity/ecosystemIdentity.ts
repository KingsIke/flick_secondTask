import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { EcosystemValidator, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { EcosystemInstance } from "../../schema/ecosystem";
import { ResponseInstance } from "../../schema/modules/ecosystemInstance";

  export const ecosystemIdentity = async (req: Request, res: Response, next:NextFunction) => {
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

    const existingEcosystem = await ResponseInstance.findOne({
      where: {
        ecosystemInstanceId: req.body.ecosystem,
      },
    });

    if (existingEcosystem) {
      return res.json({
        response: existingEcosystem,
      });
    }
    const createnewEcosystem = await EcosystemInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      ecosystem,
    });
    const response = await sendRequest(endpoint, method, createnewEcosystem);

    if (response.success) {
      const savedResponse = await ResponseInstance.create({
        id: createnewEcosystem.idempotency_ref,
        ecosystemInstanceId: createnewEcosystem.ecosystem, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await createnewEcosystem.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Crc:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
