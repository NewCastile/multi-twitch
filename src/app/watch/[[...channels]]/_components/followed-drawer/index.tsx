import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

import FollowedDrawerContent from "./followed-drawer-content";

const FollowedDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} textTransform={"uppercase"} variant={"unstyled"} onClick={onOpen}>
        Following
      </Button>
      <Drawer finalFocusRef={btnRef} isOpen={isOpen} placement={"right"} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={"monokai.bg"} color={"monokai.white"} pb={"5"} pt={"20"}>
          <DrawerCloseButton />
          <DrawerBody>
            <FollowedDrawerContent />
          </DrawerBody>
          <DrawerFooter>
            <Button mr={3} variant={"monokaiRed"} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FollowedDrawer;
