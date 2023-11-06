import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  tabsAnatomy.keys,
);

const tabsBaseTyle = definePartsStyle({
  tab: {
    fontWeight: "bold",
    fontFamily: "mono",
  },

  tablist: {
    borderBottom: "2x solid",
    borderColor: "monokai.green.primary",
  },
});

const tabMonokaiVariant = definePartsStyle(() => {
  return {
    tab: {
      color: "monokai.yellow",
      borderColor: "monokai.red.primary",
      _selected: {
        color: "monokai.red.primary",
      },
    },
  };
});

const tabVariants = {
  monokai: tabMonokaiVariant,
};

export const tabsTheme = defineMultiStyleConfig({ baseStyle: tabsBaseTyle, variants: tabVariants });
