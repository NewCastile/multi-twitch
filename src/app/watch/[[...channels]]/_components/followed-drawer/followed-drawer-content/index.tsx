"use client";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Input,
  StackDivider,
  Text,
  VStack,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

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

  const divRef = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref: divRef, handler: closeSelect });

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
    <VStack className={"content"} fontWeight={"bold"} h={"full"} w={"full"}>
      <VStack w={"full"}>
        <HStack>
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
        </HStack>
        <Text align={"left"} fontSize={"xl"} fontWeight={"black"} w={"full"}>
          Channels
        </Text>
        <Input
          _hover={{ borderColor: "blue.600" }}
          borderColor={"gray.600"}
          borderRadius={"md"}
          focusBorderColor={"blue.400"}
          placeholder={"Search..."}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.currentTarget.value);
          }}
        />
      </VStack>
      <VStack ref={divRef} w={"full"}>
        <HStack justify={"end"} w={"full"}>
          {isSelecting && selectedBroadcasts.length && (
            <>
              <CancelSelectController onClick={closeSelect}>
                <CloseIcon boxSize={"0.7em"} />
              </CancelSelectController>
              <ConfirmSelectController href={newUrl}>
                <ConfirmSelectControllerIcon boxSize={"0.7em"} selectAction={selectAction} />
              </ConfirmSelectController>
            </>
          )}
        </HStack>
        <VStack
          as={"ul"}
          divider={<StackDivider borderColor={"whiteAlpha.400"} />}
          h={"full"}
          mt={"6"}
          overflowX={"hidden"}
          overflowY={"auto"}
          w={"full"}
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
        </VStack>
        {filteredFolloweds.length && (
          <HStack align={"center"} justify={"space-between"} w={"full"}>
            {shownFollowed.length < followeds.length && (
              <Button size={"sm"} variant={"monokaiRed"} onClick={nextPageButtonOnClickHandler}>
                Show more
              </Button>
            )}
            {pageToken > FOLLOWED_ITEMS_PER_PAGE && (
              <Button size={"sm"} variant={"monokaiRed"} onClick={prevPageButtonOnClickHandler}>
                Show less
              </Button>
            )}
          </HStack>
        )}
      </VStack>
    </VStack>
  );
};

export default FollowedDrawerContent;
