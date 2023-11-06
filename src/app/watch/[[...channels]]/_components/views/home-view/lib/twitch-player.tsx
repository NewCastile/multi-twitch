"use client";

const TwitchPlayer = ({
  broadcasterLogin,
  height,
  width,
}: {
  height?: string | number | null;
  width?: string | number;
  broadcasterLogin: string;
}) => {
  return (
    <iframe
      allowFullScreen
      height={height ?? 240}
      src={`https://player.twitch.tv/?channel=${broadcasterLogin}&parent=localhost&muted=false`}
      width={width ?? "100%"}
    />
  );
};

export default TwitchPlayer;
