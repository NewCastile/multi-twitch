"use client";

import NextLink from "next/link";

import GithubIcon from "@/app/_components/icons/github-icon";

import ChatTabs from "./lib/chat-tabs";
import StreamsGrid from "./lib/stream-grid";

const HomeView = () => {
  return (
    <div
      className={
        "flex w-screen flex-col space-y-6 overflow-y-auto overflow-x-hidden text-monokai-white"
      }
    >
      <div className={"relative flex w-screen flex-row items-start justify-center px-6 py-4"}>
        <StreamsGrid />
        <ChatTabs />
      </div>
      <div
        className={
          "flex flex-col items-center justify-center py-4 text-lg font-bold text-monokai-bg-contrast"
        }
      >
        <p className={"text-center"}>
          Made by{" "}
          <NextLink
            className={"flex flex-row items-center justify-center space-x-2"}
            href={"https://github.com/NewCastile"}
          >
            <span>NewCastile</span>
            <span className={"inline-block align-top"}>
              <GithubIcon />
            </span>
          </NextLink>
        </p>
      </div>
    </div>
  );
};

export default HomeView;
