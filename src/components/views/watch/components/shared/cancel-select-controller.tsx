import { Circle, SquareProps } from "@chakra-ui/react";

const CancelSelectController = ({
  size = "25px",
  onClick,
  children,
}: {
  size?: SquareProps["size"];
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Circle
      as={"button"}
      bg={"inherit"}
      borderColor={"whiteAlpha.400"}
      borderWidth={"2px"}
      size={size}
      onClick={onClick}
    >
      {children}
    </Circle>
  );
};

export default CancelSelectController;
