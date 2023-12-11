import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

import theme from "@/theme";

import { store } from "../store";

const AuthProviders = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ChakraProviders = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export const ReduxProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const AppProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <ChakraProviders>
      <AuthProviders>
        <ReduxProvider>{children}</ReduxProvider>
      </AuthProviders>
    </ChakraProviders>
  );
};

export default AuthProviders;
