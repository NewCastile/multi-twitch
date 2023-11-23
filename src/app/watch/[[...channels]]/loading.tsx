import LoadingView from "@/app/_components/views/loading";
import { ChakraProviders } from "@/app/providers";

export default function Loading() {
  return (
    <ChakraProviders>
      <LoadingView />
    </ChakraProviders>
  );
}
