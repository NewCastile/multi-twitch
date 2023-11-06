import { NextResponse } from "next/server";

import { default as mongoClientPromise } from "@/app/api/auth/lib/client-promise";
import { ERROR_STATUS } from "@/app/constants";
import { Account } from "@/app/types";

export async function GET(req: Request, { params }: { params: { accessToken: string } }) {
  const mongoClient = await mongoClientPromise;
  const db = mongoClient.db("test");

  const accountsCollection = db.collection<Account>("accounts");

  const sessionAccount = await accountsCollection.findOne({
    access_token: params.accessToken,
  });

  if (!sessionAccount) {
    return NextResponse.json({
      message: ERROR_STATUS.resourceNotFound.case.accountNotFound.message,
      status: 400,
      statusText: ERROR_STATUS.resourceNotFound.case.accountNotFound.statusText,
    });
  }

  return NextResponse.json(sessionAccount);
}
