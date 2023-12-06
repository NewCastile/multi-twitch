/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import { useEffect, useRef, useState } from "react";

import { CloseIcon } from "@/app/_components/icons/close-icon";
import ExitFullScreenIcon from "@/app/_components/icons/exit-fullscreen-icon";
import FullScreenIcon from "@/app/_components/icons/fullscreen-icon";
import useSelectBroadcasts from "@/app/hooks/use-select-broadcasts";
import { BroadcasterBasicInfo, BroadcasterStreamCardProps, StreamsGridItem } from "@/app/types";

import FollowedDrawer from "../../../followed-drawer";
import SearchDrawer from "../../../search-drawer";
import CancelSelectController from "../../../shared/cancel-select-controller";
import ConfirmSelectController, {
  ConfirmSelectControllerIcon,
} from "../../../shared/confirm-select-controller";
import RemoveBroadcastLink from "../../../shared/remove-broadcast-link";
import SelectBroadcastButton from "../../../shared/select-broadcast-button";

import TwitchPlayer from "./twitch-player";

const orderByMaximized = (list: Array<StreamsGridItem>) => {
  const maximizedItems = list.filter((i) => i.isMaximized);
  const nonMaximizedItems = list.filter((i) => !i.isMaximized);
  const maximizedOrderedItems = maximizedItems.concat(nonMaximizedItems);

  return maximizedOrderedItems;
};

const updateGridItem = (list: Array<StreamsGridItem>, index: number) => {
  const selectedItem = list[index];
  const updatedItem: StreamsGridItem = { ...selectedItem, isMaximized: !selectedItem.isMaximized };
  const updatedList = list.slice(0, index).concat(updatedItem, list.slice(index + 1));

  return updatedList;
};

const StreamsGrid = () => {
  const {
    broadcasts,
    selectedBroadcasts,
    newUrl,
    selectAction,
    isSelecting,
    getIsSelected,
    selectControlsHandlers: { closeSelect, onSelectHandler },
  } = useSelectBroadcasts({
    selectAction: "filter",
  });

  const gridRef = useRef<HTMLDivElement>(null);

  const [listItems, setListItems] = useState<Array<StreamsGridItem>>(() =>
    broadcasts.map((b) => ({ ...b, isMaximized: false })),
  );

  useEffect(() => {
    setListItems(() => broadcasts.map((b) => ({ ...b, isMaximized: false })));
  }, [broadcasts]);

  const onFullScreen = (index: number) => {
    const newlistItems = updateGridItem(listItems, index);
    const orderedNewList = orderByMaximized(newlistItems);

    setListItems(orderedNewList);
  };

  const onSelect = ({ broadcaster }: { broadcaster: BroadcasterBasicInfo }) => {
    const { broadcaster_login, broadcaster_name } = broadcaster;

    onSelectHandler({
      broadcaster_login,
      broadcaster_name,
    });
  };

  return (
    <>
      {broadcasts && (
        <div
          ref={gridRef}
          className={"flex h-max w-[80vw] flex-col items-start justify-center space-y-4"}
        >
          <div className={"flex w-full flex-row items-center justify-between pr-4"}>
            <div className={"flex flex-row items-center justify-center space-x-6"}>
              <SearchDrawer />
              <FollowedDrawer />
            </div>
            {isSelecting && selectedBroadcasts.length > 0 && (
              <div className={"flex flex-row items-center justify-center space-x-2"}>
                <CancelSelectController onClick={closeSelect}>
                  <CloseIcon size={"10px"} />
                </CancelSelectController>
                <ConfirmSelectController href={newUrl}>
                  <ConfirmSelectControllerIcon selectAction={selectAction} size={"12px"} />
                </ConfirmSelectController>
              </div>
            )}
          </div>
          <div className={"grid w-full grid-cols-2 gap-4 pr-4"}>
            {listItems.map((broadcaster, broadcasterIdx) => {
              const { broadcaster_login } = broadcaster;
              const isSelected = getIsSelected({
                broadcaster_login,
              });

              return (
                <BroadcasterStreamCard
                  key={broadcasterIdx}
                  {...{ broadcaster, isSelected, index: broadcasterIdx, onSelect, onFullScreen }}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const BroadcasterStreamCard = ({
  broadcaster,
  isSelected,
  index,
  onSelect,
  onFullScreen,
}: BroadcasterStreamCardProps) => {
  const { broadcaster_login, broadcaster_name, isMaximized } = broadcaster;

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isMaximized ? "col-span-2" : "col-span-1"
      }`}
    >
      <div
        className={
          "flex w-full flex-col items-center justify-center space-y-3 bg-monokai-bg-secondary p-3"
        }
      >
        <div className={"flex w-full flex-row items-center justify-between px-2"}>
          <div className={"flex flex-row items-center justify-center space-x-2"}>
            <SelectBroadcastButton
              {...{ isSelected, onClickHandler: () => onSelect({ broadcaster }) }}
            />
            <p
              className={
                "w-max max-w-[19ch] border-b-4 border-b-monokai-violet-primary font-bold uppercase"
              }
            >
              {broadcaster_name ?? broadcaster_login}
            </p>
          </div>
          <div
            className={"flex flex-row items-center justify-center space-x-6"}
            color={"whiteAlpha.700"}
          >
            <button onClick={() => onFullScreen(index)}>
              {isMaximized ? <ExitFullScreenIcon /> : <FullScreenIcon />}
            </button>
            <RemoveBroadcastLink broadcasterLogin={broadcaster_login} />
          </div>
        </div>
        <TwitchPlayer broadcasterLogin={broadcaster_login} height={isMaximized ? "400px" : null} />
      </div>
    </div>
  );
};

export default StreamsGrid;
