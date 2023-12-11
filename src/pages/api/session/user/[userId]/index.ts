import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { ERROR_STATUS } from "@/constants";
import { SessionDocument } from "@/types";

import { default as mongoClientPromise } from "../../../auth/lib/client-promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(500).json({
      message: ERROR_STATUS.badRequest.case.missingQueryParameter.message("userId"),
      statusText: ERROR_STATUS.badRequest.case.missingQueryParameter.statusText,
    });
  }

  const mongoClient = await mongoClientPromise;
  const db = mongoClient.db("test");

  const sessionsCollection = db.collection<SessionDocument>("sessions");

  const session = await sessionsCollection.findOne({
    userId: new ObjectId(userId as string),
  });

  if (!session)
    return res.status(500).json({
      message: ERROR_STATUS.resourceNotFound.case.sessionNotFound.message,
      statusText: ERROR_STATUS.resourceNotFound.case.sessionNotFound.statusText,
    });

  return res.status(200).json(session);
}
