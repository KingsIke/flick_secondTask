import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createCRCidentity, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { CRCInstance } from "../../schema/crc_data";

export const creatingCRC = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=credit_crc";
    const method = "POST";
    const { data_type, credit_crc } = req.body;

    const identityCrc = createCRCidentity.validate(req.body, options);
    if (identityCrc.error) {
      return res
        .status(400)
        .json({ error: identityCrc.error.details[0].message });
    }

    const existingCrc = await CRCInstance.findOne({
      where: {
        "credit_crc.bvn": credit_crc.bvn,
      },
    });

    if (existingCrc) {
      const response = await sendRequest(endpoint, method, existingCrc);
      return res.json({
        response,
      });
    }

    const createnewCrc = await CRCInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      credit_crc,
    });
    const response = await sendRequest(endpoint, method, createnewCrc);

    if (response.success) {
      return res.status(201).json({ response });
    } else {
      await createnewCrc.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Crc:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
