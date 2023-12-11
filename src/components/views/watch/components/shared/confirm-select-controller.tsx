import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link as ChakraLink, Circle, IconProps, SquareProps } from "@chakra-ui/react";
import NextLink from "next/link";

import { SelectAction } from "@/types";

const ConfirmSelectController = ({
  size = "25px",
  href,
  children,
}: {
  size?: SquareProps["size"];
  href: string;
  children?: React.ReactNode;
}) => {
  return (
    <ChakraLink as={NextLink} href={href}>
      <Circle
        as={"button"}
        bg={"monokai.red.primary"}
        borderColor={"whiteAlpha.400"}
        borderWidth={"2px"}
        size={size}
      >
        {children}
      </Circle>
    </ChakraLink>
  );
};

export const ConfirmSelectControllerIcon = ({
  selectAction,
  boxSize,
}: {
  selectAction: SelectAction;
  boxSize: IconProps["boxSize"];
}) => {
  const MatchingAction = SelectActionIcons.find((entrie) => entrie.action === selectAction);

  return MatchingAction ? <MatchingAction.icon boxSize={boxSize} /> : null;
};

const SelectActionIcons = [
  {
    action: "filter",
    icon: ({ boxSize }: { boxSize?: IconProps["boxSize"] }) => <DeleteIcon boxSize={boxSize} />,
  },
  {
    action: "add",
    icon: ({ boxSize }: { boxSize?: IconProps["boxSize"] }) => <AddIcon boxSize={boxSize} />,
  },
];

export default ConfirmSelectController;
