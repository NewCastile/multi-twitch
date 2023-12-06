"use client";

import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";

import { MAX_BROADCASTS_NUMBER } from "@/app/constants";
import {
  selectedBroadcastsReducer,
  selectedBroadcastsinitialState,
  updateOnScreenBroadcasts,
} from "@/app/hooks/use-select-broadcasts/helpers";
import { SelectAction } from "@/app/types";

import { useAppDispatch, useAppSelector } from "../../store";
import { setMaxReached } from "../../store/broadcasts-slice";

const useSelectBroadcasts = ({ selectAction = "filter" }: { selectAction?: SelectAction }) => {
  const { broadcasts, maxReached } = useAppSelector((state) => state.broadcasts);
  const [{ selectedBroadcasts }, selectedBroadcastsDispatcher] = useReducer(
    selectedBroadcastsReducer,
    selectedBroadcastsinitialState,
  );
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Broadcasts for the next page
  const [onScreenBroadcasts, setOnScreenBroadcasts] = useState(() => {
    return updateOnScreenBroadcasts({
      currentBroadcasts: broadcasts,
      currentSelectedBroadcasts: selectedBroadcasts,
      selectAction,
    });
  });

  const [newUrl, setNewUrl] = useState(
    () => `/watch/${onScreenBroadcasts.map((broadcast) => broadcast.broadcaster_login).join("/")}`,
  );

  const getIsOnScreen = ({ broadcaster_login }: { broadcaster_login: string }) => {
    const loginMappedBroadcasts = broadcasts.map((b) => b.broadcaster_login);

    return loginMappedBroadcasts.includes(broadcaster_login);
  };

  const getIsSelected = ({ broadcaster_login }: { broadcaster_login: string }) => {
    const isSelected = selectedBroadcasts.some(
      (selectedBroadcasts) => selectedBroadcasts.broadcaster_login === broadcaster_login,
    );

    return isSelected;
  };

  const selectControlsHandlers = {
    closeSelect: () => setIsSelecting(false),
    onSelectHandler: ({
      broadcaster_login,
      broadcaster_name,
    }: {
      broadcaster_login: string;
      broadcaster_name: string;
    }) => {
      if (maxReached && selectAction === "add") return;
      if (onScreenBroadcasts.length > MAX_BROADCASTS_NUMBER) return;

      setIsSelecting(true);

      const isSelected = getIsSelected({ broadcaster_login });

      if (!isSelected) {
        selectedBroadcastsDispatcher({
          type: "add",
          payload: { broadcaster_login, broadcaster_name },
        });
      } else {
        selectedBroadcastsDispatcher({
          type: "remove",
          payload: { broadcaster_login, broadcaster_name },
        });
      }
    },
  };

  useEffect(() => {
    if (!isSelecting) {
      selectedBroadcastsDispatcher({ type: "reset" });
    }
  }, [dispatch, isSelecting]);

  useEffect(() => {
    const newOnScreenBroadcasts = updateOnScreenBroadcasts({
      currentBroadcasts: broadcasts,
      currentSelectedBroadcasts: selectedBroadcasts,
      selectAction,
    });

    if (newOnScreenBroadcasts.length >= MAX_BROADCASTS_NUMBER) {
      setOnScreenBroadcasts(newOnScreenBroadcasts.slice(0, MAX_BROADCASTS_NUMBER));
    } else {
      setOnScreenBroadcasts(newOnScreenBroadcasts);
    }
  }, [broadcasts, selectAction, selectedBroadcasts]);

  useEffect(() => {
    if (onScreenBroadcasts.length >= MAX_BROADCASTS_NUMBER) {
      dispatch(setMaxReached(true));
    } else {
      dispatch(setMaxReached(false));
    }
  }, [dispatch, onScreenBroadcasts]);

  useEffect(() => {
    setNewUrl(
      () =>
        `/watch/${onScreenBroadcasts.map((broadcast) => broadcast.broadcaster_login).join("/")}`,
    );
  }, [onScreenBroadcasts]);

  useEffect(() => {
    router.prefetch(newUrl);
  }, [newUrl, router]);

  return {
    broadcasts,
    selectedBroadcasts,
    newUrl,
    selectAction,
    selectControlsHandlers,
    isSelecting,
    getIsOnScreen,
    getIsSelected,
  } as const;
};

export default useSelectBroadcasts;
