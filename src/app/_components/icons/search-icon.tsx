"use client";

import { DEFAULT_ICON_SIZE } from "@/app/constants";
import { IconProps } from "@/app/types";

export const SearchIcon = ({ size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg
      aria-hidden={"true"}
      fill={"none"}
      height={size}
      viewBox={"0 0 20 20"}
      width={size}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path
        d={"m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"}
        stroke={"currentColor"}
        stroke-linecap={"round"}
        stroke-linejoin={"round"}
        stroke-width={"2"}
      />
    </svg>
  );
};
