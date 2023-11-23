"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

import theme from "@/app/theme";

import { store } from "../store";

const AuthProviders = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ChakraProviders = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export const ReduxProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const AppProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <AuthProviders>
      <ChakraProviders>
        <ReduxProvider>{children}</ReduxProvider>
      </ChakraProviders>
    </AuthProviders>
  );
};

export default AuthProviders;
