import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { RadarBvnValidator, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { RDBvnInstance } from "../../schema/radarbvn";

export const creatingRDBvn = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=radar_bvn";
    const method = "POST";
    const { data_type, radar_bvn } = req.body;
    const identityRDBAvn = RadarBvnValidator.validate(req.body, options);
    if (identityRDBAvn.error) {
      return res
        .status(400)
        .json({ error: identityRDBAvn.error.details[0].message });
    }

    const existingRDBvn = await RDBvnInstance.findOne({
      where: {
        "radar_bvn.bvn": radar_bvn.bvn,
      },
    });

    if (existingRDBvn) {
      const response = await sendRequest(endpoint, method, existingRDBvn);
      return res.json({
        response,
      });
    }
    const createnewCrc = await RDBvnInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      radar_bvn,
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
