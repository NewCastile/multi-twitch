"use client";
import { Button } from "@chakra-ui/react";

const SearchNextButton = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <Button size={"sm"} variant={"monokaiRed"} onClick={onClickHandler}>
      Show more
    </Button>
  );
};

export default SearchNextButton;
