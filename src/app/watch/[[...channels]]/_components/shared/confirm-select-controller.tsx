/* eslint-disable tailwindcss/no-custom-classname */
import NextLink from "next/link";

import { AddIcon } from "@/app/_components/icons/add-icon";
import { DeleteIcon } from "@/app/_components/icons/delete-icon";
import { DEFAULT_ICON_SIZE } from "@/app/constants";
import { IconProps, SelectAction } from "@/app/types";

const ConfirmSelectController = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <NextLink href={href}>
      <div
        className={`rounded-full border-2 border-monokai-bg-contrast bg-monokai-red-primary p-2`}
        onClick={onClick}
      >
        {children}
      </div>
    </NextLink>
  );
};

export const ConfirmSelectControllerIcon = ({
  selectAction,
  size = DEFAULT_ICON_SIZE,
}: { selectAction: SelectAction } & IconProps) => {
  const MatchingAction = SelectActionIcons.find((entrie) => entrie.action === selectAction);

  return MatchingAction ? <MatchingAction.icon size={size} /> : null;
};

const SelectActionIcons = [
  {
    action: "filter",
    icon: ({ size }: IconProps) => <DeleteIcon size={size} />,
  },
  {
    action: "add",
    icon: ({ size }: IconProps) => <AddIcon size={size} />,
  },
];

export default ConfirmSelectController;
