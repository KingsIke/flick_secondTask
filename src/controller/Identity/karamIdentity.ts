import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { KarmaValidator, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { KARMAInstance } from "../../schema/karma";

export const creatingKarma = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=karma";
    const method = "POST";
    const { data_type, karma } = req.body;

    const identityKarma = KarmaValidator.validate(req.body, options);
    if (identityKarma.error) {
      return res
        .status(400)
        .json({ error: identityKarma.error.details[0].message });
    }

    const existingKarma = await KARMAInstance.findOne({
      where: {
        "karma.bvn": karma.bvn,
      },
    });

    if (existingKarma) {
      const response = await sendRequest(endpoint, method, existingKarma);
      return res.json({
        response,
      });
    }

    const createnewCrc = await KARMAInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      karma,
    });
    const response = await sendRequest(endpoint, method, createnewCrc);

    if (response.success) {
      return res.status(201).json({ response });
    } else {
      await createnewCrc.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Karma:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
