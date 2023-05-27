import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  DriversValidator,
  createCRCidentity,
  createNinidentity,
  options,
} from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { DriverInstance } from "../../schema/driverslicense";

export const creatingDriverlicence = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=drivers_license";
    const method = "POST";
    const { data_type, drivers_license } = req.body;

    const identityDriver = DriversValidator.validate(req.body, options);
    if (identityDriver.error) {
      return res
        .status(400)
        .json({ error: identityDriver.error.details[0].message });
    }

    const existingLicense = await DriverInstance.findOne({
      where: {
        "drivers_license.license_number": drivers_license.license_number,
      },
    });

    if (existingLicense) {
      const response = await sendRequest(endpoint, method, existingLicense);
      return res.json({
        response,
      });
    }

    const createnewLicense = await DriverInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      drivers_license,
    });
    const response = await sendRequest(endpoint, method, createnewLicense);

    if (response.success) {
      return res.status(201).json({ response });
    } else {
      await createnewLicense.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Crc:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
