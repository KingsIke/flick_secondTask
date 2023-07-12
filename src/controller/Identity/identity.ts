import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { AddressValidator, AmlDataTypeValidator, BankAccountValidator, BasicPhoneValidator, CACValidator, DriversValidator, EcosystemValidator, KarmaValidator, RadarBvnValidator, RadarPhoneValidator, createBvnidentity, createCRCidentity, createCreditPremiumidentity, createFirstCreditidentity, createNinidentity, createPhoneidentity, createVotersCardidentity, options } from "../../utils/utils";
import { sendRequest } from "../../config/osyterUrl";
import { AddressInstance } from "../../schema/address";
import { AddressIdentityInstance } from "../../schema/modules/addressInstance";
import { AlmIdentityInstance } from "../../schema/modules/amlInstance";
import { AlmInstance } from "../../schema/aml";
import { BankIdentityInstance } from "../../schema/modules/bank_accountInstance";
import { BankInstance } from "../../schema/bank_account";
import { BasicPhoneInstance } from "../../schema/modules/basicphoneInstance";
import { BPhoneInstance } from "../../schema/basicphone";
import { BVNIdentityInstance } from "../../schema/modules/bvnInstance";
import { BvnInstance } from "../../schema/bvn";
import { CACIdentityInstance } from "../../schema/modules/cacInstance";
import { CACInstance } from "../../schema/cac";
import { PremiumIdentityInstance } from "../../schema/modules/credit_premium.Instance";
import { PremiumInstance } from "../../schema/credit_premium";
import { DriverIdentityInstance } from "../../schema/modules/driverslicenseInstance";
import { DriverInstance } from "../../schema/driverslicense";
import { EcosystemIdentityInstance } from "../../schema/modules/ecosystemInstance";
import { EcosystemInstance } from "../../schema/ecosystem";
import { FirstCentralIdentityInstance } from "../../schema/modules/first_centralInstance";
import { CreditInstance } from "../../schema/first_central";
import { KarmaIdentityInstance } from "../../schema/modules/karmaInstance";
import { KARMAInstance } from "../../schema/karma";
import { NINIdentityInstance } from "../../schema/modules/ninInstance";
import { NinInstance } from "../../schema/nin";
import { PhoneIdentityInstance } from "../../schema/modules/phoneInstance";
import { PhoneInstance } from "../../schema/phone";
import { RDBVNIdentityInstance } from "../../schema/modules/radarbvnInstance";
import { RDBvnInstance } from "../../schema/radarbvn";
import { RDPhoneIdentityInstance } from "../../schema/modules/radarphoneInstance";
import { RDPHONEInstance } from "../../schema/radarphone";
import { VoteIdentityInstance } from "../../schema/modules/voters_cardInstance";
import { VoterCardInstance } from "../../schema/voters_card";
import { CRCIdentityInstance } from "../../schema/modules/crc_dataInstance";
import { CRCInstance } from "../../schema/crc_data";



export const addressIdentity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const endpoint = "/identity-verification?data_type=address";
    const method = "POST";
    const { data_type, address } = req.body;

    const identityAddress = AddressValidator.validate(req.body, options);
    if (identityAddress.error) {
      return res
        .status(400)
        .json({ error: identityAddress.error.details[0].message });
    }

    const existingAddress = await AddressIdentityInstance.findOne({
      where: {
        addressInstanceId: req.body.address,
      },
    });

    if (existingAddress) {
      return res.json({
        data:existingAddress,
      });
    }

    const createnewAddress = await AddressInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      address,
    });
    const response = await sendRequest(endpoint, method, createnewAddress);

    if (response.success) {
      const savedResponse = await AddressIdentityInstance.create({
        id: createnewAddress.idempotency_ref,
        addressInstanceId: createnewAddress.address, 
        data: response.data,
      });
      return res
      .status(201)
      .json({ response });
  } else {

    await createnewAddress.destroy();
    throw new Error(response.msg);
  }
   
  } catch (error: any) {
    console.error("Error getting Address:", error.message);
    res.status(500).json({ error: "Wrong Data" });
  }
};

export const almIdentity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data_type, aml } = req.body;
    const endpoint = "/identity-verification?data_type=aml";

    const method = "POST";

    const identityAlm = AmlDataTypeValidator.validate(req.body, options);
    if (identityAlm.error) {
      return res.status(400).json({
        Error: identityAlm.error.details[0].message,
      });
    }

    const duplicateAlm = await AlmIdentityInstance.findOne({
      where: {
        almInstanceId: req.body.alm
      },
    });

    if (duplicateAlm) {
        return res.json({
          data:duplicateAlm,
        });
      
    }
    const amlCreated = await AlmInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      aml,
    });

    const response = await sendRequest(endpoint, method, amlCreated);
    if (response.success) {
      const savedResponse = await AlmIdentityInstance.create({
        id: amlCreated.idempotency_ref,
        almInstanceId: amlCreated.aml, 
        data: response.data,
      });
      return res
        .status(201)
        .json({  response:savedResponse });
    } else {
      await amlCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Aml:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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


    const existingBank = await BankIdentityInstance.findOne({
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
      const savedResponse = await BankIdentityInstance.create({
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

export const basicPhoneIdentity = async (req: Request, res: Response) => {
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
    const existingBasicPhone = await BasicPhoneInstance.findOne({
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
      const savedResponse = await BasicPhoneInstance.create({
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

export const bvnIdentity = async (
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


      const Duplicate_result = await BVNIdentityInstance.findOne({
        where : {
          bvnInstanceId :req.body.bvn
        }
      })
       if (Duplicate_result) {
        return res.json({data: Duplicate_result})
       }


    const bvnCreated = await BvnInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      bvn,
    });

    const response = await sendRequest(endpoint, method, bvnCreated);

    if (response.success) {
      const savedResponse = await BVNIdentityInstance.create({
        id: bvnCreated.idempotency_ref,
        bvnInstanceId: bvnCreated.bvn, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await bvnCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting bvn:", error.message);
    res.status(500).json({ error});
  }
};

export const crcIdentity = async (req: Request, res: Response) => {
    try {
      const endpoint = "/identity-verification?data_type=credit_crc";
      const method = "POST";
      const { data_type, credit_crc } = req.body;
  
      const identityCrc = createCRCidentity.validate(req.body, options);
      if (identityCrc.error) {
        return res
          .status(400)
          .json({ error: identityCrc.error.details[0].message });
      }
  
      const existingCrc = await CRCIdentityInstance.findOne({
        where: {
          creditcrcInstanceId: req.body.credit_crc,
        },
      });
  
      if (existingCrc) {
        return res.json({
          response: existingCrc,
        });
      }
  
      const createnewCrc = await CRCInstance.create({
        idempotency_ref: uuidv4(),
        data_type,
        credit_crc,
      });
      const response = await sendRequest(endpoint, method, createnewCrc);
  
      if (response.success) {
        const savedResponse = await CRCIdentityInstance.create({
          id: createnewCrc.idempotency_ref,
          creditcrcInstanceId: createnewCrc.credit_crc, 
          data: response.data,
        });
  
        return res.status(201).json({ response: savedResponse });
      } else {
        await createnewCrc.destroy();
        throw new Error(response.msg);
      }
    } catch (error: any) {
      console.error("Error getting Crc:", error.message);
      res.status(500).json({ error: "Wrong Data Input" });
    }
  };

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
    const duplicateCac = await CACIdentityInstance.findOne({
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
      const savedResponse = await CACIdentityInstance.create({
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

export const creditPremuimIdentity = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=credit_premium";
    const method = "POST";
    const { data_type, credit_premium } = req.body;

    const identityPremium = createCreditPremiumidentity.validate(
      req.body,
      options
    );
    if (identityPremium.error) {
      return res
        .status(400)
        .json({ error: identityPremium.error.details[0].message });
    }

    const existingPremium = await PremiumIdentityInstance.findOne({
      where: {
        creditpremiumInstanceId: req.body.credit_premium,
      },
    });

    if (existingPremium) {
      // const response = await sendRequest(endpoint, method, existingPremium);
      return res.json({
        response: existingPremium,
      });
    }

    const createnewCrc = await PremiumInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      credit_premium,
    });
    const response = await sendRequest(endpoint, method, createnewCrc);

    if (response.success) {
      const savedResponse = await PremiumIdentityInstance.create({
        id: createnewCrc.idempotency_ref,
        creditpremiumInstanceId: createnewCrc.credit_premium, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await createnewCrc.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Crc:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};

export const driverLicenceIdentity = async (req: Request, res: Response) => {
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

    const existingLicense = await DriverIdentityInstance.findOne({
      where: {
        driverlicInstanceId: req.body.drivers_license,
      },
    });

    if (existingLicense) {
      return res.json({
        response: existingLicense,
      });
    }

    const createnewLicense = await DriverInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      drivers_license,
    });
    const response = await sendRequest(endpoint, method, createnewLicense);

    if (response.success) {
      const savedResponse = await DriverIdentityInstance.create({
        id: createnewLicense.idempotency_ref,
        driverlicInstanceId: createnewLicense.drivers_license, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await createnewLicense.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Crc:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};

export const ecosystemIdentity = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const endpoint = "/identity-verification?data_type=ecosystem";
    const method = "POST";
    const { data_type, ecosystem } = req.body;

    const identityEcosystem = EcosystemValidator.validate(req.body, options);
    if (identityEcosystem.error) {
      return res
        .status(400)
        .json({ error: identityEcosystem.error.details[0].message });
    }

    const existingEcosystem = await EcosystemIdentityInstance.findOne({
      where: {
        ecosystemInstanceId: req.body.ecosystem,
      },
    });

    if (existingEcosystem) {
      return res.json({
        response: existingEcosystem,
      });
    }
    const createnewEcosystem = await EcosystemInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      ecosystem,
    });
    const response = await sendRequest(endpoint, method, createnewEcosystem);

    if (response.success) {
      const savedResponse = await EcosystemIdentityInstance.create({
        id: createnewEcosystem.idempotency_ref,
        ecosystemInstanceId: createnewEcosystem.ecosystem, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await createnewEcosystem.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Crc:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};


export const firstCentralIdentity = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=credit_first_central";
    const method = "POST";
    const { data_type, credit_first_central } = req.body;

    const identityCredit = createFirstCreditidentity.validate(
      req.body,
      options
    );
    if (identityCredit.error) {
      return res
        .status(400)
        .json({ error: identityCredit.error.details[0].message });
    }

    const existingCrc = await FirstCentralIdentityInstance.findOne({
      where: {
        creditfirstInstanceId: req.body.credit_first_central,
      },
    });

    if (existingCrc) {
      return res.json({
        response : existingCrc,
      });
    }

    const createnewCrc = await CreditInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      credit_first_central,
    });
    const response = await sendRequest(endpoint, method, createnewCrc);

    if (response.success) {
      const savedResponse = await FirstCentralIdentityInstance.create({
        id: createnewCrc.idempotency_ref,
        creditfirstInstanceId: createnewCrc.credit_first_central, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await createnewCrc.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Credit central:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};

export const karmaIdentity = async (req: Request, res: Response) => {
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

    const existingKarma = await KarmaIdentityInstance.findOne({
      where: {
        karmaInstanceId: req.body.karma,
      },
    });

    if (existingKarma) {
      return res.json({
        response : existingKarma,
      });
    }

    const createnewKarma = await KARMAInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      karma,
    });
    const response = await sendRequest(endpoint, method, createnewKarma);

    if (response.success) {
      const savedResponse = await KarmaIdentityInstance.create({
        id: createnewKarma.idempotency_ref,
        karmaInstanceId: createnewKarma.karma, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await createnewKarma.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Karma:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};

export const ninIdentity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const endpoint = "/identity-verification?data_type=nin";
    const method = "POST";
    const { data_type, nin } = req.body;

    const identityNin = createNinidentity.validate(req.body, options);
    if (identityNin.error) {
      return res.status(400).json({
        Error: identityNin.error.details[0].message,
      });
    }

    const duplicateNin = await NINIdentityInstance.findOne({ where: { ninInstanceId: req.body.nin } });

    if (duplicateNin) {
      return res.json({
        response3 : duplicateNin,
      });
    }
    const ninCreated = await NinInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      nin,
    });
    const response = await sendRequest(endpoint, method, ninCreated);

    if (response.success) {
      const savedResponse = await NINIdentityInstance.create({
        id: ninCreated.idempotency_ref,
        ninInstanceId: ninCreated.nin, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await ninCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Nin:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};

export const phoneIdentity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const endpoint = "/identity-verification?data_type=phone";
    const method = "POST";
    const { data_type, phone } = req.body;

    const identityPhone = createPhoneidentity.validate(req.body, options);
    if (identityPhone.error) {
      return res.status(400).json({
        Error: identityPhone.error.details[0].message,
      });
    }

    const duplicatePhone = await PhoneIdentityInstance.findOne({
      where: { phoneInstanceId: req.body.phone },
    });

    if (duplicatePhone) {
      return res.json({
        response : duplicatePhone,
      });
    }
    const PhoneCreated = await PhoneInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      phone,
    });
    const response = await sendRequest(endpoint, method, PhoneCreated);

    if (response.success) {
      const savedResponse = await PhoneIdentityInstance.create({
        id: PhoneCreated.idempotency_ref,
        phoneInstanceId: PhoneCreated.phone, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await PhoneCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Phone:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};


export const radarBvnIdentity = async (req: Request, res: Response) => {
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

    const existingRDBvn = await RDBVNIdentityInstance.findOne({
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
      const savedResponse = await RDBVNIdentityInstance.create({
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

export const radarPhoneIdentity = async (req: Request, res: Response) => {
  try {
    const endpoint = "/identity-verification?data_type=radar_phone";
    const method = "POST";
    const { data_type, radar_phone } = req.body;

    const identityRDPhone = RadarPhoneValidator.validate(req.body, options);
    if (identityRDPhone.error) {
      return res
        .status(400)
        .json({ error: identityRDPhone.error.details[0].message });
    }

    const existingRDPhone = await RDPhoneIdentityInstance.findOne({
      where: {
        radarphoneInstanceId: req.body.radar_phone,
      },
    });

    if (existingRDPhone) {;
      return res.json({
        response : existingRDPhone,
      });
    }

    const createnewRDPhone = await RDPHONEInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      radar_phone,
    });
    const response = await sendRequest(endpoint, method, createnewRDPhone);

    if (response.success) {
      const savedResponse = await RDPhoneIdentityInstance.create({
        id: createnewRDPhone.idempotency_ref,
        radarphoneInstanceId: createnewRDPhone.radar_phone, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await createnewRDPhone.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Crc:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};

export const votersCardIdentity = async (
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

    const duplicateVoter = await VoteIdentityInstance.findOne({
      where: { voterInstanceId: req.body.voters_card },
    });

    if (duplicateVoter) {
      // const response = await sendRequest(endpoint, method, duplicateVoter);
      return res.json({
        response : duplicateVoter,
      });
    }

    const VoterCreated = await VoterCardInstance.create({
      idempotency_ref: uuidv4(),
      data_type,
      voters_card,
    });
    const response = await sendRequest(endpoint, method, VoterCreated);

    if (response.success) {
      const savedResponse = await VoteIdentityInstance.create({
        id: VoterCreated.idempotency_ref,
        voterInstanceId: VoterCreated.voters_card, 
        data: response.data,
      });

      return res.status(201).json({ response: savedResponse });
    } else {
      await VoterCreated.destroy();
      throw new Error(response.msg);
    }
  } catch (error: any) {
    console.error("Error getting Voter card:", error.message);
    res.status(500).json({ error: "Wrong Data Input" });
  }
};