import NextLink from "next/link";

import { CloseIcon } from "@/app/_components/icons/close-icon";
import { DEFAULT_ICON_SIZE } from "@/app/constants";
import { useAppSelector } from "@/app/store";
import { IconProps } from "@/app/types";

const RemoveBroadcastLink = ({
  broadcasterLogin,
  size = DEFAULT_ICON_SIZE,
}: { broadcasterLogin: string } & IconProps) => {
  const { broadcasts } = useAppSelector((state) => state.broadcasts);
  const channels = broadcasts.map((broadcast) => broadcast.broadcaster_login);
  const newChannels = channels.filter((channel) => channel !== broadcasterLogin).join("/");
  const linkHref = `/watch/${newChannels}`;

  return (
    <NextLink href={linkHref}>
      <CloseIcon size={size} />
    </NextLink>
  );
};

export default RemoveBroadcastLink;
