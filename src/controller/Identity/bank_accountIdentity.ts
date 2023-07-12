import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { BankAccountValidator, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { BankInstance } from "../../schema/bank_account";
import { ResponseInstance } from "../../schema/modules/bank_accountInstance";

export const bankAccountIdentity = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=bank_account";
    const method = "POST";
    const { data_type, bank_account } = req.body;

    const identityBank = BankAccountValidator.validate(req.body, options);


    if (identityBank.error) {
      return res.status(400).json({
        Error: identityBank.error.details[0].message,
      });
    }


    const existingBank = await ResponseInstance.findOne({
      where: {
        bankInstanceId: req.body.bank_account,
      },
    });

    if (existingBank) {
      return res.json({
        data: existingBank,
      });
    }

    const createnewBank = await BankInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      bank_account,
    });
    const response = await sendRequest(endpoint, method, createnewBank);

    if (response.success) {
      const savedResponse = await ResponseInstance.create({
        id: createnewBank.idempotency_ref,
        bankInstanceId: createnewBank.bank_account, 
        data: response.data,
      });
      return res
        .status(201)
        .json({  response:savedResponse });
    } else {
      await createnewBank.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Bank Account:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
