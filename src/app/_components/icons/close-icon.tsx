"use client";

import { DEFAULT_ICON_SIZE } from "@/app/constants";
import { IconProps } from "@/app/types";

export const CloseIcon = ({ size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg
      aria-hidden={"true"}
      fill={"none"}
      height={size}
      viewBox={"0 0 14 14"}
      width={size}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path
        d={"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"}
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
      />
    </svg>
  );
};
