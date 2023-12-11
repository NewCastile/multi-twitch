import { NextApiRequest, NextApiResponse } from "next";

import { ERROR_STATUS } from "@/constants";
import { User } from "@/types";

import { default as mongoClientPromise } from "../../auth/lib/client-promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  if (!name) {
    return res.status(500).json({
      message: ERROR_STATUS.badRequest.case.missingQueryParameter.message("name"),
      statusText: ERROR_STATUS.badRequest.case.missingQueryParameter.statusText,
    });
  }

  const mongoClient = await mongoClientPromise;
  const db = mongoClient.db("test");

  const usersCollection = db.collection<User>("users");
  const user = await usersCollection.findOne({
    name,
  });

  if (!user)
    return res.status(500).json({
      message: ERROR_STATUS.resourceNotFound.case.userNotFound.message,
      statusText: ERROR_STATUS.resourceNotFound.case.userNotFound.statusText,
    });

  return res.status(200).json(user);
}
