import {
  BroadcasterBasicInfo,
  BroadcastsUpdateFunctionArgs,
  SelectAction,
  SelectedBroadcastsAction,
  SelectedBroadcastsState,
} from "@/app/types";

export const selectedBroadcastsinitialState: SelectedBroadcastsState = { selectedBroadcasts: [] };

export const selectedBroadcastsReducer = (
  state: SelectedBroadcastsState,
  action: SelectedBroadcastsAction,
) => {
  switch (action.type) {
    case "reset":
      return { selectedBroadcasts: [] };

    case "add":
      return { selectedBroadcasts: state.selectedBroadcasts.concat(action.payload) };

    case "remove": {
      const { broadcaster_login } = action.payload;

      return {
        selectedBroadcasts: state.selectedBroadcasts.filter(
          (sb) => sb.broadcaster_login !== broadcaster_login,
        ),
      };
    }
    default:
      return state;
  }
};

// Functions for updating the newBroadcast state
export const broadcastsUpdateFunctions: Array<{
  action: SelectAction;
  updateFn: ({
    currentBroadcasts,
    currentSelectedBroadcasts,
  }: BroadcastsUpdateFunctionArgs) => Array<BroadcasterBasicInfo>;
}> = [
  {
    action: "add",
    updateFn: ({ currentBroadcasts, currentSelectedBroadcasts }: BroadcastsUpdateFunctionArgs) =>
      Array.from(new Set(currentBroadcasts.concat(currentSelectedBroadcasts))),
  },
  {
    action: "filter",
    updateFn: ({ currentBroadcasts, currentSelectedBroadcasts }: BroadcastsUpdateFunctionArgs) => {
      const logginMappedSelectedBroadcasts = currentSelectedBroadcasts.map(
        (b) => b.broadcaster_login,
      );

      return currentBroadcasts.filter(
        (broadcast) => !logginMappedSelectedBroadcasts.includes(broadcast.broadcaster_login),
      );
    },
  },
];

export const updateOnScreenBroadcasts = ({
  currentBroadcasts,
  currentSelectedBroadcasts,
  selectAction,
}: {
  currentBroadcasts: Array<BroadcasterBasicInfo>;
  currentSelectedBroadcasts: Array<BroadcasterBasicInfo>;
  selectAction: SelectAction;
}) => {
  const broadcastUpdateFnsEntrie = broadcastsUpdateFunctions.find(
    (entrie) => entrie.action === selectAction,
  );

  if (!broadcastUpdateFnsEntrie) return currentBroadcasts;

  return broadcastUpdateFnsEntrie.updateFn({ currentBroadcasts, currentSelectedBroadcasts });
};
