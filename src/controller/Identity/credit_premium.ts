import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createCreditPremiumidentity, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { PremiumInstance } from "../../schema/credit_premium";

export const creatingPremuim = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=credit_premium";
    const method = "POST";
    const { data_type, credit_premium } = req.body;

    const identityPremium = createCreditPremiumidentity.validate(
      req.body,
      options
    );
    if (identityPremium.error) {
      return res
        .status(400)
        .json({ error: identityPremium.error.details[0].message });
    }

    const existingPremium = await PremiumInstance.findOne({
      where: {
        "credit_premium.bvn": credit_premium.bvn,
      },
    });

    if (existingPremium) {
      const response = await sendRequest(endpoint, method, existingPremium);
      return res.json({
        response,
      });
    }

    const createnewCrc = await PremiumInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      credit_premium,
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
