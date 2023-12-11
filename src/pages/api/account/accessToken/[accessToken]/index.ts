import { NextApiRequest, NextApiResponse } from "next";

import { ERROR_STATUS } from "@/constants";
import { Account } from "@/types";

import { default as mongoClientPromise } from "../../../auth/lib/client-promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = req.query;

  if (!accessToken) {
    return res.status(500).json({
      message: ERROR_STATUS.badRequest.case.missingQueryParameter.message("accessToken"),
      statusText: ERROR_STATUS.badRequest.case.missingQueryParameter.statusText,
    });
  }
  const mongoClient = await mongoClientPromise;
  const db = mongoClient.db("test");

  const accountsCollection = db.collection<Account>("accounts");

  const sessionAccount = await accountsCollection.findOne({
    access_token: accessToken,
  });

  if (!sessionAccount) {
    return res.status(500).json({
      message: ERROR_STATUS.resourceNotFound.case.accountNotFound.message,
      statusText: ERROR_STATUS.resourceNotFound.case.accountNotFound.statusText,
    });
  }

  return res.status(200).json(sessionAccount);
}
