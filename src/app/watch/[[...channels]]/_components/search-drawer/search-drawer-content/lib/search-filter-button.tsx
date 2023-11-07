"use client";
import { Button } from "@chakra-ui/react";

const SearchFilterButton = ({
  disabled,
  isActive,
  onClickHandler,
  children,
}: {
  disabled?: boolean;
  isActive?: boolean;
  onClickHandler: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button disabled={disabled} isActive={isActive} variant={"monokaiRed"} onClick={onClickHandler}>
      {children}
    </Button>
  );
};

export default SearchFilterButton;
