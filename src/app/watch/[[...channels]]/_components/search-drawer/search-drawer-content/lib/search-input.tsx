"use client";
import { ChangeEvent, KeyboardEvent } from "react";

import { SearchIcon } from "@/app/_components/icons/search-icon";

const SearchInput = ({
  value,
  onChangeHandler,
  onKeyUpHandler,
  buttonOnClickHandler,
}: {
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUpHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
  buttonOnClickHandler: () => void;
}) => {
  return (
    <div className={"flex w-full flex-col items-center justify-center"}>
      <div className={"relative flex w-max flex-col items-center justify-center"}>
        <input
          className={
            "block w-full rounded-md border-2 border-monokai-bg-contrast bg-inherit px-2 py-1 outline-none placeholder:text-monokai-bg-contrast focus:outline focus:outline-2 focus:outline-monokai-red-light active:outline active:outline-2 active:outline-monokai-red-light"
          }
          placeholder={"Search a streamer"}
          value={value}
          onChange={(e) => onChangeHandler(e)}
          onKeyUp={(e) => onKeyUpHandler(e)}
        />
        <div className={"absolute right-2 flex items-center"}>
          <button onClick={buttonOnClickHandler}>
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
