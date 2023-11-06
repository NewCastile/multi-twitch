import { type ThemeConfig, extendTheme } from "@chakra-ui/react";

import { buttonTheme } from "./button";
import { tabsTheme } from "./tabs";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  semanticTokens: {
    colors: {
      monokai: {
        bg: "#272822",
        bg_secondary: "#3e3d32",
        bg_contrast: "#75715e",
        white: "#f8f8f2",
        yellow: "#e6db74",
        orange: "#fd971f",
        violet: { primary: "#ae81ff", dark: "#9055fa", darker: "#7426ff" },
        red: { primary: "#f92672", dark: "#871e44", light: "#f54786" },
        blue: "#66d9ef",
        green: { primary: "#a7e22e", dark: "#6a8f1e", light: "#bce861" },
      },
    },
  },
  components: {
    Tabs: tabsTheme,
    Button: buttonTheme,
  },
});

export default theme;
