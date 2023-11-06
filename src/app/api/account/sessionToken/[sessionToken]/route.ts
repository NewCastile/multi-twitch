import { NextResponse } from "next/server";

import { default as mongoClientPromise } from "@/app/api/auth/lib/client-promise";
import { ERROR_STATUS } from "@/app/constants";
import { Account, SessionDocument } from "@/app/types";

export async function GET(req: Request, { params }: { params: { sessionToken: string } }) {
  const mongoClient = await mongoClientPromise;
  const db = mongoClient.db("test");

  const sessionsCollection = db.collection<SessionDocument>("sessions");
  const userSession = await sessionsCollection.findOne({
    sessionToken: params.sessionToken,
  });

  if (!userSession) {
    const { message, statusText } = ERROR_STATUS.resourceNotFound.case.sessionNotFound;

    return NextResponse.json({
      message,
      status: 400,
      statusText,
    });
  }

  const { userId: sessionUserId } = userSession;
  const accountsCollection = db.collection<Account>("accounts");

  const sessionAccount = await accountsCollection.findOne({
    userId: sessionUserId,
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
