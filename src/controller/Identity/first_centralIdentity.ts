import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createFirstCreditidentity, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { CreditInstance } from "../../schema/first_central";
import { ResponseInstance } from "../../schema/modules/first_centralInstance";

export const firstCentralIdentity = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=credit_first_central";
    const method = "POST";
    const { data_type, credit_first_central } = req.body;

    const identityCredit = createFirstCreditidentity.validate(
      req.body,
      options
    );
    if (identityCredit.error) {
      return res
        .status(400)
        .json({ error: identityCredit.error.details[0].message });
    }

    const existingCrc = await ResponseInstance.findOne({
      where: {
        creditfirstInstanceId: req.body.credit_first_central,
      },
    });

    if (existingCrc) {
      return res.json({
        response : existingCrc,
      });
    }

    const createnewCrc = await CreditInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      credit_first_central,
    });
    const response = await sendRequest(endpoint, method, createnewCrc);

    if (response.success) {
      const savedResponse = await ResponseInstance.create({
        id: createnewCrc.idempotency_ref,
        creditfirstInstanceId: createnewCrc.credit_first_central, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await createnewCrc.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Credit central:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
