"use client";

import { FollowedChannelItemProps } from "@/app/types";

import AddBroadcastLink from "../../../../shared/add-broadcast-link";
import SelectBroadcastButton from "../../../../shared/select-broadcast-button";

import { getFollowAge } from "./follow-age";

const FollowedChannelItem = ({
  followedChannel,
  isSelected,
  isOnScreen,
  onClickHandler,
}: FollowedChannelItemProps) => {
  return (
    <li className={"flex w-full flex-row items-center justify-between space-x-2 py-4"}>
      <div className={"flex flex-col items-center justify-center"}>
        {!isOnScreen && <SelectBroadcastButton {...{ isSelected, onClickHandler }} />}
      </div>
      <div className={"flex w-full flex-col items-center justify-start"}>
        <p className={"w-full text-left text-monokai-yellow"}>{followedChannel.broadcaster_name}</p>
        <p className={"w-full text-left text-xs font-bold text-gray-400"}>
          follow age: {getFollowAge(followedChannel.followed_at)}
        </p>
      </div>
      {!isOnScreen && (
        <AddBroadcastLink iconOnly broadcasterLogin={followedChannel.broadcaster_login} />
      )}
    </li>
  );
};

export default FollowedChannelItem;
