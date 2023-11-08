import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { ObjectId } from "mongodb";
import NextAuth, { NextAuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

import clientPromise, { default as mongoClientPromise } from "@/app/api/auth/lib/client-promise";
import { User } from "@/app/types";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    TwitchProvider({
      clientId: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      authorization: {
        params: {
          client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID as string,
          scope: "channel:manage:polls channel:read:polls openid user:read:email user:read:follows",
          claims: {
            userinfo: { preferred_username: { essential: true, value: "name" } },
          },
        },
      },
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.preferred_username,
          email: profile.email,
          image: profile.picture,
        };
      },
      style: {
        logo: "/twitch.svg",
        logoDark: "/twitch-dark.svg",
        bg: "#fff",
        text: "#65459B",
        bgDark: "#65459B",
        textDark: "#fff",
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  events: {
    async signIn({ user, profile, isNewUser }) {
      // Updates user information in case it changes between sessions
      if (profile && !isNewUser) {
        const { name: profileName, image: profileImage } = profile;
        const { name: userName, image: userImage } = user;

        if (userName !== profileName) {
          console.log("Profile's name does not match the sign in user name");
          console.log("updating user name...");
          const mongoClient = await mongoClientPromise;
          const db = mongoClient.db("test");
          const newImage = userImage !== profileImage ? profileImage : userImage;
          const usersCollection = db.collection<User>("users");
          const updateUserResponse = await usersCollection.updateOne(
            {
              _id: new ObjectId(user.id),
            },
            { $set: { name: profileName, image: newImage } },
          );

          if (!updateUserResponse.acknowledged) {
            console.log("Failed to update the sign in user info");
          } else {
            console.log("Update successfull");
          }
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
