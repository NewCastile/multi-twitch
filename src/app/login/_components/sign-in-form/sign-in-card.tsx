"use client";

const SignInCard = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <div
      className={"flex min-h-screen flex-col items-center justify-center space-y-3 text-gray-400"}
    >
      <h1 className={"text-5xl font-bold"}>
        Hello and welcome to <br />
        my Multi-Twitch App!
      </h1>
      <h2 className={"text-3xl font-medium text-gray-500"}>please, sign in with</h2>
      {children}
    </div>
  );
};

export default SignInCard;
