import { Text, VStack } from "@chakra-ui/react";
import { ClientSafeProvider } from "next-auth/react";

import SignInForm from "./components/sign-in-form";

const LoginView = ({ provider }: { provider?: ClientSafeProvider }) => {
  return provider ? (
    <VStack bg={"monokai.bg"} h={"full"} w={"full"}>
      <SignInForm {...{ provider }} />
    </VStack>
  ) : (
    <VStack
      align={"center"}
      color={"whiteAlpha.700"}
      justify={"center"}
      minH={"100vh"}
      spacing={"3"}
    >
      <Text as={"h1"} fontSize={"5xl"} fontWeight={"bold"}>
        No provider was found.
      </Text>
      <Text as={"h2"} color={"whiteAlpha.500"} fontSize={"3xl"} fontWeight={"medium"}>
        Please contact with the developer to fix this issue
      </Text>
    </VStack>
  );
};

export default LoginView;
