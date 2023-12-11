import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Account } from "next-auth";

import { ERROR_STATUS } from "@/constants";

import { default as mongoClientPromise } from "../../../auth/lib/client-promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const parsedBody = JSON.parse(req.body);

    const { accountId, newAccessToken, newRefreshToken } = parsedBody as {
      accountId?: string;
      newAccessToken?: string;
      newRefreshToken?: string;
    };

    if (!accountId) {
      return res.status(500).json({
        message: ERROR_STATUS.badRequest.case.missingQueryParameter.message("accountId"),
        statusText: ERROR_STATUS.badRequest.case.missingQueryParameter.statusText,
      });
    }

    if (!newAccessToken) {
      return res.status(500).json({
        message: ERROR_STATUS.badRequest.case.missingQueryParameter.message("newAccessToken"),
        statusText: ERROR_STATUS.badRequest.case.missingQueryParameter.statusText,
      });
    }

    if (!newRefreshToken) {
      return res.status(500).json({
        message: ERROR_STATUS.badRequest.case.missingQueryParameter.message("newRefreshToken"),
        statusText: ERROR_STATUS.badRequest.case.missingQueryParameter.statusText,
      });
    }

    const mongoClient = await mongoClientPromise;
    const db = mongoClient.db("test");
    const accountsCollection = db.collection<Account>("accounts");

    const accountTokenUpdateResult = await accountsCollection.findOneAndUpdate(
      { _id: new ObjectId(accountId) },
      { $set: { access_token: newAccessToken, refresh_token: newRefreshToken } },
      { returnDocument: "after" },
    );

    const { ok: updateSuccess, value: updateResult } = accountTokenUpdateResult;

    if (!updateSuccess || !updateResult)
      return res.status(500).json({
        message: "Couldn't update your access token",
        status: 400,
        statusText: ERROR_STATUS.resourceNotFound.case.accountNotFound.message,
      });

    return res.status(200).json(updateResult);
  }
}
