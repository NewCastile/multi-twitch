"use client";

import NextImage from "next/image";

import { FollowedStreamItemProps } from "@/app/types";

import AddBroadcastLink from "../../../shared/add-broadcast-link";
import SelectBroadcastButton from "../../../shared/select-broadcast-button";

const FollowedStreamItem = ({
  followedStream,
  isSelected,
  isOnScreen,
  onClickHandler,
}: FollowedStreamItemProps) => {
  const { thumbnail_url, user_name, user_login, title, game_name } = followedStream;

  return (
    <li
      className={
        "flex w-full flex-col items-center justify-center space-y-3 py-4 text-xs font-medium uppercase"
      }
    >
      <div className={"flex w-full flex-row items-center justify-between space-x-2 text-left"}>
        {!isOnScreen && (
          <div className={"flex flex-col items-center justify-center"}>
            <SelectBroadcastButton {...{ isSelected, onClickHandler }} />
          </div>
        )}
        <p className={"w-full text-justify font-black text-inherit"}>{user_name}</p>
        {!isOnScreen && <AddBroadcastLink iconOnly broadcasterLogin={user_login} />}
      </div>
      <NextImage
        alt={"profile-picture"}
        height={112}
        src={thumbnail_url.replace("{width}", "200").replace("{height}", "112")}
        width={200}
      />
      <p className={"w-full text-monokai-green-primary"}>{title}</p>
      <div className={"flex w-full flex-row items-center justify-center"}>
        <div className={"mr-2 inline-block h-2.5 w-2.5 rounded-full bg-monokai-red-light"} />
        <p className={"w-full text-left text-monokai-yellow"}>{game_name}</p>
      </div>
    </li>
  );
};

export default FollowedStreamItem;
