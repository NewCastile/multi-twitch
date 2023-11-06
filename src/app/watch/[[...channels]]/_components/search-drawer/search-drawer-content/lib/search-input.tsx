import { Search2Icon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent } from "react";

const SearchInput = ({
  value,
  onChangeHandler,
  onKeyUpHandler,
  buttonOnClickHandler,
}: {
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUpHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
  buttonOnClickHandler: () => void;
}) => {
  return (
    <InputGroup size={"sm"} width={"90%"}>
      <Input
        _hover={{ borderColor: "blue.600" }}
        borderColor={"gray.600"}
        borderRadius={"md"}
        focusBorderColor={"blue.400"}
        placeholder={"Search a streamer"}
        value={value}
        onChange={(e) => onChangeHandler(e)}
        onKeyUp={(e) => onKeyUpHandler(e)}
      />
      <InputRightElement>
        <Button size={"xs"} type={"submit"} variant={"link"} onClick={buttonOnClickHandler}>
          <Search2Icon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
