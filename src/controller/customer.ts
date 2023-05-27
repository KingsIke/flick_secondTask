import express, {Request, Response, NextFunction} from 'express'
import { v4 as uuidv4 } from "uuid";
import { createCustomerSchema, options } from '../utils/utils';
import { CustomerInstance } from '../schema/customer';
import {sendRequest} from "../config/osyterUrl"


export const createCustomer = async(req: Request, res: Response, next: NextFunction)=>  {
const { phone_number, full_name, bvn, nin, tracking_code, country, reg_no} = req.body;

const id = uuidv4();
const idempotency_ref = id


try {
    

const validateCustomer = createCustomerSchema.validate(req.body, options);
    if (validateCustomer.error) {
      return res.status(400).json({
        Error: validateCustomer.error.details[0].message,
      });
    }

/// Duplicates
    const duplicatePhone = await CustomerInstance.findOne({where: {phone_number: phone_number}})
    if(duplicatePhone) {
        return res.status(400).json({
            Error: "Customer Phone already exist!",
          });
    }

    const duplicateBvn = await CustomerInstance.findOne({where: {bvn: bvn}})
    if(duplicateBvn) {
        return res.status(400).json({
            Error: "Customer Bvn already exist!",
          });
    }

    const duplicateNin = await CustomerInstance.findOne({where: {nin: nin}})
    if(duplicateNin) {
        return res.status(400).json({
            Error: "Customer NIN already exist!",
          });
    }
const endpoint = '/customers';
const method = "POST";

    const customer  =  await CustomerInstance.create({
        id: idempotency_ref,
        phone_number, 
        full_name,
         bvn, 
         nin, 
         tracking_code : uuidv4(), 
         country, 
         reg_no: uuidv4()

    })
    const response = await sendRequest(endpoint, method, customer)
    if(!response) {
        return res.status(500).json({ status: 500, error: 'Error creating customer' });

    }

    return res.status(201).json({ status: 201, msg: 'Customer created successfully', response});
} 
catch (error:any) {
    console.error('Error creating customer:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
}
}