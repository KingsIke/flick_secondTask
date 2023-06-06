import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { RadarBvnValidator, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { RDBvnInstance } from "../../schema/radarbvn";
import { ResponseInstance } from "../../schema/modules/radarbvnInstance";
// import { ResponseInstance } from "../../schema/modules/radarbvnInstance";;

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

    const existingRDBvn = await ResponseInstance.findOne({
      where: {
        radarbvnInstanceId: req.body.radar_bvn,
      },
    });

    if (existingRDBvn) {
      return res.json({
        response : existingRDBvn,
      });
    }
    const createnewRadarbvn = await RDBvnInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      radar_bvn,
    });
    const response = await sendRequest(endpoint, method, createnewRadarbvn);

    if (response.success) {
      const savedResponse = await ResponseInstance.create({
        id: createnewRadarbvn.idempotency_ref,
        radarbvnInstanceId: createnewRadarbvn.radar_bvn, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await createnewRadarbvn.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
