import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createBvnidentity,
  options,
} from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { BvnInstance } from "../../schema/bvn";

export const createBvn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const endpoint = "/identity-verification";
    const method = "POST";
    const { data_type, bvn } = req.body;

    const identityBvn = createBvnidentity.validate(req.body, options);
    if (identityBvn.error) {
      return res.status(400).json({
        Error: identityBvn.error.details[0].message,
      });
    }

    const duplicateBvn = await BvnInstance.findOne({ where: { bvn: bvn } });
    if (duplicateBvn) {
      const response = await sendRequest(endpoint, method, duplicateBvn);
      return res.json({
        response,
      });
    }

    const bvnCreated = await BvnInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      bvn,
    });

    const response = await sendRequest(endpoint, method, bvnCreated);

    if (response.success) {
      return res
        .status(201)
        .json({  response });
    } else {
      await bvnCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting bvn:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
