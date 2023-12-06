"use client";

import { DEFAULT_ICON_SIZE } from "@/app/constants";
import { IconProps } from "@/app/types";

export const DeleteIcon = ({ size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg
      aria-hidden={"true"}
      fill={"none"}
      height={size}
      viewBox={"0 0 18 20"}
      width={size}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path
        d={
          "M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
        }
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
      />
    </svg>
  );
};
