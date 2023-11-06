import { TriangleDownIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const SearchNextButton = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <Button size={"xs"} variant={"monokaiRed"} onClick={onClickHandler}>
      <TriangleDownIcon />
    </Button>
  );
};

export default SearchNextButton;
