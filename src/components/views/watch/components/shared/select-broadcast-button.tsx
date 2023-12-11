import { Button, ButtonProps } from "@chakra-ui/react";

const SelectBroadcastButton = ({
  isSelected,
  size,
  onClickHandler,
}: {
  isSelected: boolean;
  onClickHandler: () => void;
  size?: ButtonProps["size"];
}) => {
  return (
    <Button
      _hover={{ bg: isSelected ? "monokai.red.primary" : "inherit" }}
      bg={isSelected ? "monokai.red.primary" : "inherit"}
      borderColor={"whiteAlpha.400"}
      borderRadius={"full"}
      borderWidth={"medium"}
      colorScheme={"whiteAlpha"}
      size={size}
      variant={"ghost"}
      onClick={onClickHandler}
    />
  );
};

export default SelectBroadcastButton;
