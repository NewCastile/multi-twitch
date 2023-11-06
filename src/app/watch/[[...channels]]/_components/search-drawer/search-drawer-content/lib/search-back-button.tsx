import { TriangleUpIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const SearchBackButton = ({
  display,
  onClickHandler,
}: {
  display: string;
  onClickHandler: () => void;
}) => {
  return (
    <Button display={display} size={"xs"} variant={"monokaiRed"} onClick={onClickHandler}>
      <TriangleUpIcon />
    </Button>
  );
};

export default SearchBackButton;
