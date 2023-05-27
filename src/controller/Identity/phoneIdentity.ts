import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createPhoneidentity, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { PhoneInstance } from "../../schema/phone";

export const createPhone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const endpoint = "/identity-verification?data_type=phone";
    const method = "POST";
    const { data_type, phone } = req.body;

    const identityPhone = createPhoneidentity.validate(req.body, options);
    if (identityPhone.error) {
      return res.status(400).json({
        Error: identityPhone.error.details[0].message,
      });
    }

    const duplicatePhone = await PhoneInstance.findOne({
      where: { phone: phone },
    });

    if (duplicatePhone) {
      const response = await sendRequest(endpoint, method, duplicatePhone);
      return res.json({
        response,
      });
    }
    const PhoneCreated = await PhoneInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      phone,
    });
    const response = await sendRequest(endpoint, method, PhoneCreated);

    if (response.success) {
      return res.status(201).json({ response });
    } else {
      await PhoneCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Phone:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
