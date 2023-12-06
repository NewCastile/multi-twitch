"use client";

import { DEFAULT_ICON_SIZE } from "@/app/constants";
import { IconProps } from "@/app/types";

export const AddIcon = ({ size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg
      aria-hidden={"true"}
      fill={"none"}
      height={size}
      viewBox={"0 0 18 18"}
      width={size}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path
        d={"M9 1v16M1 9h16"}
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
      />
    </svg>
  );
};
