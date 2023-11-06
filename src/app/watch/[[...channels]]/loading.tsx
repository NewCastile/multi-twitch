"use client";
import { Grid, GridItem, HStack, Skeleton, VStack } from "@chakra-ui/react";

export default function Loading() {
  const startColor = "monokai.bg";
  const endColor = "monokai.bg_secondary";

  return (
    <VStack color={"monokai.white"} overflowX={"hidden"} overflowY={"auto"} py={"4"} w={"100vw"}>
      <HStack align={"start"} justify={"start"} position={"relative"} px={"6"} w={"100vw"}>
        <VStack align={"start"} className={"streams-grid"} h={"max"} justify={"center"} w={"70vw"}>
          <HStack justifyContent={"space-between"} pr={"4"} w={"full"}>
            <HStack spacing={"6"}>
              <Skeleton endColor={endColor} h={"40px"} startColor={startColor} w={"60px"} />
              <Skeleton endColor={endColor} h={"40px"} startColor={startColor} w={"60px"} />
            </HStack>
            <Skeleton endColor={endColor} h={"40px"} startColor={startColor} w={"60px"} />
          </HStack>

          <Grid gap={"4"} pr={"4"} templateColumns={"repeat(2, minmax(330px, 1fr))"} w={"full"}>
            {Array(5)
              .fill(0)
              .map((_, idx) => {
                return (
                  <GridItem key={idx}>
                    <Skeleton
                      endColor={endColor}
                      height={"240px"}
                      startColor={startColor}
                      w={"full"}
                    />
                  </GridItem>
                );
              })}
          </Grid>
        </VStack>
        <Skeleton
          endColor={endColor}
          h={"600px"}
          position={"sticky"}
          startColor={startColor}
          top={"0"}
          w={"30vw"}
        />
      </HStack>
    </VStack>
  );
}
