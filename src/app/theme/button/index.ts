import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const buttonMonokaiVioletVariant = defineStyle({
  background: "monokai.violet.primary",
  color: "monokai.white",
  _hover: {
    background: "monokai.violet.dark",
  },
  _active: {
    background: "monokai.violet.darker",
  },
});

const buttonMonokaiRedVariant = defineStyle({
  background: "monokai.red.primary",
  color: "monokai.white",
  _hover: {
    background: "monokai.red.dark",
  },
  _active: {
    background: "monokai.red.dark",
  },
});

const buttonMonokaiGreenVariant = defineStyle({
  background: "monokai.green.primary",
  color: "monokai.white",
  _hover: {
    background: "monokai.green.dark",
  },
  _active: {
    background: "monokai.green.dark",
  },
});

const buttonVariants = {
  monokaiGreen: buttonMonokaiGreenVariant,
  monokaiRed: buttonMonokaiRedVariant,
  monokaiViolet: buttonMonokaiVioletVariant,
};

export const buttonTheme = defineStyleConfig({ variants: buttonVariants });
