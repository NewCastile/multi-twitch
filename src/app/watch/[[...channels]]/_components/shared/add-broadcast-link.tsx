"use client";
import NextLink from "next/link";

import { AddIcon } from "@/app/_components/icons/add-icon";
import { useAppSelector } from "@/app/store";

const AddBroadcastLink = ({
  broadcasterLogin,
  iconOnly = false,
}: {
  broadcasterLogin: string;
  iconOnly?: boolean;
}) => {
  const { broadcasts, maxReached } = useAppSelector((state) => state.broadcasts);

  const channels = broadcasts.map((broadcast) => broadcast.broadcaster_login);
  const newChannels = channels.join("/").concat(`/${broadcasterLogin}`);
  const isNewChannel = channels.every((channel) => channel !== broadcasterLogin);

  const linkHref = `/watch/${newChannels}`;

  if (maxReached || !isNewChannel) return null;

  return (
    <div className={"px-2 py-1"}>
      <NextLink className={"text-gray-400"} href={linkHref}>
        {iconOnly ? (
          <AddIcon />
        ) : (
          <p>
            Add <AddIcon />
          </p>
        )}
      </NextLink>
    </div>
  );
};

export default AddBroadcastLink;
