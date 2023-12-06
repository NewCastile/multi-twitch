"use client";

import FollowedDrawer from "../followed-drawer";
import SearchDrawer from "../search-drawer";

const NoChannelsView = () => {
  return (
    <div className={"mt-10"}>
      <h1 className={"text-3xl font-extrabold text-monokai-bg-contrast"}>
        Look up for some twitch channels c:
      </h1>
      <div
        className={
          "flex flex-row items-center justify-center space-x-4  divide-x-2 divide-monokai-bg-contrast"
        }
      >
        <SearchDrawer />
        <FollowedDrawer />
      </div>
    </div>
  );
};

export default NoChannelsView;
