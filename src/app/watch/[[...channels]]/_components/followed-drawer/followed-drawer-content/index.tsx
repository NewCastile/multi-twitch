"use client";
import { useState } from "react";

import { CloseIcon } from "@/app/_components/icons/close-icon";
import { FOLLOWED_ITEMS_PER_PAGE } from "@/app/constants";
import { isFollowedChannel } from "@/app/helpers/type-guards";
import useSearchFollowed from "@/app/hooks/use-search-followed";
import useSelectBroadcasts from "@/app/hooks/use-select-broadcasts";
import { BroadcasterBasicInfo, FollowedEntity } from "@/app/types";

import SearchFilterButton from "../../search-drawer/search-drawer-content/lib/search-filter-button";
import CancelSelectController from "../../shared/cancel-select-controller";
import ConfirmSelectController, {
  ConfirmSelectControllerIcon,
} from "../../shared/confirm-select-controller";

import FollowedChannelItem from "./lib/followed-channel-item";
import FollowedStreamItem from "./lib/followed-stream-item";

const FollowedDrawerContent = () => {
  const {
    newUrl,
    selectedBroadcasts,
    selectAction,
    isSelecting,
    getIsOnScreen,
    getIsSelected,
    selectControlsHandlers: { closeSelect, onSelectHandler },
  } = useSelectBroadcasts({ selectAction: "add" });

  const [query, setQuery] = useState<string>("");
  const [liveOnly, setLiveOnly] = useState<boolean>(false);

  const {
    followeds,
    filteredFolloweds,
    pageToken,
    shownFollowed,
    controlButtonsHandler: { nextPageButtonOnClickHandler, prevPageButtonOnClickHandler },
  } = useSearchFollowed({ query, liveOnly });

  const getFollowedBasicInfo = (followed: FollowedEntity) => {
    const { broadcaster_login, broadcaster_name }: BroadcasterBasicInfo = isFollowedChannel(
      followed,
    )
      ? followed
      : { broadcaster_login: followed.user_login, broadcaster_name: followed.user_name };

    return { broadcaster_login, broadcaster_name };
  };

  return (
    <div className={"flex h-full w-full flex-col items-center justify-start px-4 pb-4 font-bold"}>
      <div className={"flex w-full flex-col items-center justify-center space-y-4"}>
        <div className={"flex flex-row items-center justify-center space-x-2"}>
          <SearchFilterButton
            disabled={false}
            isActive={!liveOnly}
            onClickHandler={() => setLiveOnly(false)}
          >
            All
          </SearchFilterButton>
          <SearchFilterButton
            disabled={false}
            isActive={liveOnly}
            onClickHandler={() => setLiveOnly(true)}
          >
            Live only
          </SearchFilterButton>
        </div>
        <p className={"w-full text-left text-xl font-black"}>Channels</p>
        <input
          className={
            "block w-full rounded-md border-2 border-monokai-bg-contrast bg-inherit px-2 py-1 outline-none placeholder:text-monokai-bg-contrast focus:outline focus:outline-2 focus:outline-monokai-red-light active:outline active:outline-2 active:outline-monokai-red-light"
          }
          placeholder={"Search..."}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.currentTarget.value);
          }}
        />
      </div>
      <div className={"flex w-full flex-col items-center justify-center space-y-4 py-4"}>
        <div className={"flex w-full flex-row items-center justify-end space-x-2"}>
          {isSelecting && selectedBroadcasts.length > 0 && (
            <>
              <CancelSelectController onClick={closeSelect}>
                <CloseIcon size={"0.6rem"} />
              </CancelSelectController>
              <ConfirmSelectController href={newUrl}>
                <ConfirmSelectControllerIcon selectAction={selectAction} size={"0.6rem"} />
              </ConfirmSelectController>
            </>
          )}
        </div>
        <ul
          className={
            "mt-6 flex h-full w-full flex-col items-center justify-center divide-y-2 divide-monokai-bg-contrast overflow-y-auto overflow-x-hidden"
          }
        >
          {filteredFolloweds.map((followed, followedIdx) => {
            const { broadcaster_login, broadcaster_name } = getFollowedBasicInfo(followed);
            const isSelected = getIsSelected({ broadcaster_login });
            const isOnScreen = getIsOnScreen({ broadcaster_login });
            const onClickHandler = () =>
              onSelectHandler({
                broadcaster_login,
                broadcaster_name,
              });

            return isFollowedChannel(followed) ? (
              <FollowedChannelItem
                key={followedIdx}
                {...{ followedChannel: followed, isSelected, isOnScreen, onClickHandler }}
              />
            ) : (
              <FollowedStreamItem
                key={followedIdx}
                {...{ followedStream: followed, isSelected, isOnScreen, onClickHandler }}
              />
            );
          })}
        </ul>
        {filteredFolloweds.length > 0 && (
          <div className={"flex w-full flex-row items-center justify-between"}>
            {shownFollowed.length < followeds.length && (
              <button className={"btn-sm btn-monokai-red"} onClick={nextPageButtonOnClickHandler}>
                Show more
              </button>
            )}
            {pageToken > FOLLOWED_ITEMS_PER_PAGE && (
              <button className={"btn-sm btn-monokai-red"} onClick={prevPageButtonOnClickHandler}>
                Show less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowedDrawerContent;
