import { NextResponse } from "next/server";

import { default as mongoClientPromise } from "@/app/api/auth/lib/client-promise";
import { ERROR_STATUS } from "@/app/constants";
import { User } from "@/app/types";

export async function GET(req: Request, { params }: { params: { name: string } }) {
  const mongoClient = await mongoClientPromise;
  const db = mongoClient.db("test");

  const usersCollection = db.collection<User>("users");
  const user = await usersCollection.findOne({
    name: params.name,
  });

  if (!user)
    return NextResponse.json({
      message: ERROR_STATUS.resourceNotFound.case.userNotFound.message,
      status: 500,
      statusText: ERROR_STATUS.resourceNotFound.case.userNotFound.statusText,
    });

  return NextResponse.json(user);
}
