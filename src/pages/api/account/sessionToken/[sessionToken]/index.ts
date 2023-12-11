import { NextApiRequest, NextApiResponse } from "next";

import { ERROR_STATUS } from "@/constants";
import { Account, SessionDocument } from "@/types";

import { default as mongoClientPromise } from "../../../auth/lib/client-promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sessionToken } = req.query;

  if (!sessionToken) {
    return res.status(500).json({
      message: ERROR_STATUS.badRequest.case.missingQueryParameter.message("sessionToken"),
      statusText: ERROR_STATUS.badRequest.case.missingQueryParameter.statusText,
    });
  }

  const mongoClient = await mongoClientPromise;
  const db = mongoClient.db("test");

  const sessionsCollection = db.collection<SessionDocument>("sessions");
  const userSession = await sessionsCollection.findOne({
    sessionToken,
  });

  if (!userSession) {
    const { message, statusText } = ERROR_STATUS.resourceNotFound.case.sessionNotFound;

    return res.status(500).json({
      message,
      statusText,
    });
  }

  const { userId: sessionUserId } = userSession;
  const accountsCollection = db.collection<Account>("accounts");

  const sessionAccount = await accountsCollection.findOne({
    userId: sessionUserId,
  });

  if (!sessionAccount) {
    return res.status(500).json({
      message: ERROR_STATUS.resourceNotFound.case.accountNotFound.message,
      statusText: ERROR_STATUS.resourceNotFound.case.accountNotFound.statusText,
    });
  }

  return res.status(200).json(sessionAccount);
}
