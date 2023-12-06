/* eslint-disable tailwindcss/no-custom-classname */
"use client";

const LoadingView = () => {
  return (
    <div
      className={
        "flex w-screen animate-pulse flex-col items-center justify-center overflow-y-auto overflow-x-hidden py-4 text-monokai-white"
      }
      role={"status"}
    >
      <div className={"relative flex w-screen flex-row items-start justify-start px-6"}>
        <div className={"flex h-max w-[70vw] flex-col items-start justify-center"}>
          <div className={"flex w-full flex-row items-center justify-between pr-4"}>
            <div className={"flex flex-row space-x-6"}>
              <div className={"h-[40px] w-[60px] bg-monokai-bg"} />
              <div className={"h-[40px] w-[60px] bg-monokai-bg"} />
            </div>
            <div className={"h-[40px] w-[60px] bg-monokai-bg"} />
          </div>

          <div className={"grid-cols-[repeat(2, minmax(330px, 1fr))] grid w-full gap-4 pr-4"}>
            {Array(5)
              .fill(0)
              .map((_, idx) => {
                return <div key={idx} className={"h-[240px] w-full bg-monokai-bg"} />;
              })}
          </div>
        </div>
        <div className={"sticky top-0 h-[600px] w-[30vw] bg-monokai-bg"} />
      </div>
    </div>
  );
};

export default LoadingView;
