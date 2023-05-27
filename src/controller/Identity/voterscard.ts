import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createVotersCardidentity, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { VoterCardInstance } from "../../schema/voters_card";

export const createVotersCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const endpoint = "/identity-verification?data_type=voters_card";
    const method = "POST";
    const { data_type, voters_card } = req.body;

    const identityVoter = createVotersCardidentity.validate(req.body, options);
    if (identityVoter.error) {
      return res.status(400).json({
        Error: identityVoter.error.details[0].message,
      });
    }

    const duplicateVoter = await VoterCardInstance.findOne({
      where: { voters_card: voters_card },
    });

    if (duplicateVoter) {
      const response = await sendRequest(endpoint, method, duplicateVoter);
      return res.json({
        response,
      });
    }

    const VoterCreated = await VoterCardInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      voters_card,
    });
    const response = await sendRequest(endpoint, method, VoterCreated);

    if (response.success) {
      return res.status(201).json({ response });
    } else {
      await VoterCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Voter card:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};
