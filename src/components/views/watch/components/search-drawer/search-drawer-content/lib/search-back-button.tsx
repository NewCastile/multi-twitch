import { Button } from "@chakra-ui/react";

const SearchBackButton = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <Button size={"sm"} variant={"monokaiRed"} onClick={onClickHandler}>
      Show less
    </Button>
  );
};

export default SearchBackButton;
