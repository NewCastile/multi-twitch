"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

import { store } from "../store";

const AuthProviders = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ReduxProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const AppProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <AuthProviders>
      <ReduxProvider>{children}</ReduxProvider>
    </AuthProviders>
  );
};

export default AuthProviders;
