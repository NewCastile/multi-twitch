import { CloseIcon } from "@chakra-ui/icons";
import { Button, Grid, GridItem, HStack, Text, VStack, useOutsideClick } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import ExitFullScreenIcon from "@/components/icons/exit-fullscreen-icon";
import FullScreenIcon from "@/components/icons/fullscreen-icon";
import useSelectBroadcasts from "@/hooks/use-select-broadcasts";
import { BroadcasterBasicInfo, BroadcasterStreamCardProps, StreamsGridItem } from "@/types";

import FollowedDrawer from "../../components/followed-drawer";
import SearchDrawer from "../../components/search-drawer";
import CancelSelectController from "../../components/shared/cancel-select-controller";
import ConfirmSelectController, {
  ConfirmSelectControllerIcon,
} from "../../components/shared/confirm-select-controller";
import RemoveBroadcastLink from "../../components/shared/remove-broadcast-link";
import SelectBroadcastButton from "../../components/shared/select-broadcast-button";

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

  useOutsideClick({ ref: gridRef, handler: closeSelect });

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
        <VStack
          ref={gridRef}
          align={"start"}
          className={"streams-grid"}
          h={"max"}
          justify={"center"}
          w={"80vw"}
        >
          <HStack justifyContent={"space-between"} pr={"4"} w={"full"}>
            <HStack spacing={"6"}>
              <SearchDrawer />
              <FollowedDrawer />
            </HStack>
            {isSelecting && selectedBroadcasts.length && (
              <HStack>
                <CancelSelectController size={"30px"} onClick={closeSelect}>
                  <CloseIcon boxSize={"0.8em"} />
                </CancelSelectController>
                <ConfirmSelectController href={newUrl} size={"30px"}>
                  <ConfirmSelectControllerIcon boxSize={"0.8em"} selectAction={selectAction} />
                </ConfirmSelectController>
              </HStack>
            )}
          </HStack>
          <Grid gap={"4"} pr={"4"} templateColumns={"repeat(2, minmax(330px, 1fr))"} w={"full"}>
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
          </Grid>
        </VStack>
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
    <GridItem colSpan={isMaximized ? 2 : 1}>
      <VStack bg={"monokai.bg_secondary"} p={"2"} w={"full"}>
        <HStack justify={"space-between"} px={"2"} w={"full"}>
          <HStack>
            <SelectBroadcastButton
              {...{ isSelected, size: "xs", onClickHandler: () => onSelect({ broadcaster }) }}
            />
            <Text
              borderBottom={"4px"}
              borderBottomColor={"monokai.violet.primary"}
              casing={"uppercase"}
              fontWeight={"bold"}
              maxW={"19ch"}
              w={"max"}
            >
              {broadcaster_name ?? broadcaster_login}
            </Text>
          </HStack>
          <HStack color={"whiteAlpha.700"}>
            <Button
              colorScheme={"whiteAlpha"}
              size={"sm"}
              variant={"ghost"}
              onClick={() => onFullScreen(index)}
            >
              {isMaximized ? <ExitFullScreenIcon /> : <FullScreenIcon />}
            </Button>
            <RemoveBroadcastLink broadcasterLogin={broadcaster_login} />
          </HStack>
        </HStack>
        <TwitchPlayer broadcasterLogin={broadcaster_login} height={isMaximized ? "400px" : null} />;
      </VStack>
    </GridItem>
  );
};

export default StreamsGrid;
