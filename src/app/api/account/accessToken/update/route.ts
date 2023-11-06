import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Account } from "next-auth";

import { default as mongoClientPromise } from "@/app/api/auth/lib/client-promise";
import { ERROR_STATUS } from "@/app/constants";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { accountId, newAccessToken, newRefreshToken } = body;
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
    return NextResponse.json({
      message: "Couldn't update your access token",
      status: 400,
      statusText: ERROR_STATUS.resourceNotFound.case.accountNotFound.message,
    });

  return NextResponse.json(updateResult);
}
