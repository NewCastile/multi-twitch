import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { default as mongoClientPromise } from "@/app/api/auth/lib/client-promise";
import { ERROR_STATUS } from "@/app/constants";
import { SessionDocument } from "@/app/types";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const mongoClient = await mongoClientPromise;
  const db = mongoClient.db("test");

  const sessionsCollection = db.collection<SessionDocument>("sessions");

  const session = await sessionsCollection.findOne({
    userId: new ObjectId(params.userId),
  });

  if (!session)
    return NextResponse.json({
      message: ERROR_STATUS.resourceNotFound.case.sessionNotFound.message,
      status: 500,
      statusText: ERROR_STATUS.resourceNotFound.case.sessionNotFound.statusText,
    });

  return NextResponse.json(session);
}
