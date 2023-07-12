import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { CACValidator, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";

import { CACInstance } from "../../schema/cac";
import { ResponseInstance } from "../../schema/modules/cacInstance";

export const cacIdentity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data_type, cac } = req.body;

    const endpoint = "/identity-verification?data_type=cac";

    const method = "POST";

    const identityCac = CACValidator.validate(req.body, options);
    if (identityCac.error) {
      return res.status(400).json({
        Error: identityCac.error.details[0].message,
      });
    }

    //   /// Duplicates
    const duplicateCac = await ResponseInstance.findOne({
      where: {
        cacInstanceId: req.body.cac,
      },
    });

    if (duplicateCac) {
      // const response = await sendRequest(endpoint, method, duplicateCac);
      return res.json({
        response: duplicateCac,
      });
    }
    const cacCreated = await CACInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      cac,
    });

    const response = await sendRequest(endpoint, method, cacCreated);

    if (response.success) {
      const savedResponse = await ResponseInstance.create({
        id: cacCreated.idempotency_ref,
        cacInstanceId: cacCreated.cac, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await cacCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting CAC:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
