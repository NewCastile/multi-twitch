import { Text, VStack } from "@chakra-ui/react";

const SignInCard = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <VStack
      align={"center"}
      color={"whiteAlpha.700"}
      justify={"center"}
      minH={"100vh"}
      spacing={"3"}
    >
      <Text as={"h1"} fontSize={"5xl"} fontWeight={"bold"}>
        Hello and welcome to <br />
        my Multi-Twitch App!
      </Text>
      <Text as={"h2"} color={"whiteAlpha.500"} fontSize={"3xl"} fontWeight={"medium"}>
        please, sign in with
      </Text>
      {children}
    </VStack>
  );
};

export default SignInCard;
