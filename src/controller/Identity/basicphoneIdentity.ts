import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { BasicPhoneValidator, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { BPhoneInstance } from "../../schema/basicphone";
import { ResponseInstance } from "../../schema/modules/basicphoneInstance";

export const creatingBPhone = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=phone_basic";
    const method = "POST";
    const { data_type, phone_basic } = req.body;

    const identityBPhone = BasicPhoneValidator.validate(req.body, options);
    if (identityBPhone.error) {
      return res
        .status(400)
        .json({ error: identityBPhone.error.details[0].message });
    }
    const existingBasicPhone = await ResponseInstance.findOne({
      where: {
        phoneBasicInstanceId: req.body.phone_basic,
      },
    });

    if (existingBasicPhone) {
      return res.json({
        response: existingBasicPhone,
      });
    }

    const createnewBasicPhone = await BPhoneInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      phone_basic,
    });
    const response = await sendRequest(endpoint, method, createnewBasicPhone);

    if (response.success) {
      const savedResponse = await ResponseInstance.create({
        id: createnewBasicPhone.idempotency_ref,
        phoneBasicInstanceId: createnewBasicPhone.phone_basic, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await createnewBasicPhone.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
