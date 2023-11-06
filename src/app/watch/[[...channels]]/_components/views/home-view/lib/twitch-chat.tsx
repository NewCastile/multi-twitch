"use client";

const TwitchChat = ({
  broadcasterLogin,
  height,
  width,
}: {
  broadcasterLogin: string;
  height?: string | number;
  width?: string | number;
}) => {
  return (
    <iframe
      height={height ?? 500}
      id={"twitch-chat-embed"}
      src={`https://www.twitch.tv/embed/${broadcasterLogin}/chat?parent=localhost`}
      width={width ?? "100%"}
    />
  );
};

export default TwitchChat;
