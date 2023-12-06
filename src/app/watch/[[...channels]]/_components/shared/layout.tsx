import SignOutButton from "../sign-out-button";

const WatchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        "flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-monokai-bg text-sm text-monokai-white"
      }
    >
      <div
        className={
          "flex w-full flex-row items-center justify-between border-t-8 border-t-monokai-orange bg-monokai-bg-contrast px-5 py-3"
        }
      >
        <div>
          <p className={"font-mono text-3xl font-black uppercase text-monokai-white"}>
            My Multi-Twitch
          </p>
        </div>
        <SignOutButton />
      </div>
      {children}
    </div>
  );
};

export default WatchLayout;
