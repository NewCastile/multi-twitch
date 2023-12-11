import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

import SearchDrawerContent from "./search-drawer-content";

const SearchDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} textTransform={"uppercase"} variant={"unstyled"} onClick={onOpen}>
        Search
      </Button>
      <Drawer finalFocusRef={btnRef} isOpen={isOpen} placement={"right"} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={"monokai.bg"} color={"monokai.white"} pb={"5"} pt={"20"}>
          <DrawerCloseButton />
          <DrawerBody>
            <SearchDrawerContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
