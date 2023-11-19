import { FC, useEffect, useState } from "react";
import { EventModel } from "../model/EventModel";
import { Player, PlayerState, PlayerReference } from "video-react";
import { EventList } from "./EventList";
import { EventRectangles } from "./EventRectangles";

interface IVideoPlayer {
  url: string;
  items: EventModel[];
}

export const VideoPlayer: FC<IVideoPlayer> = ({ url, items }) => {
  const [playerRef, setPlayer] = useState<PlayerReference | null>(null);
  const [state, setState] = useState<PlayerState | null>(null);

  const playFrom = (time: number) => {
    playerRef?.seek(time);
  };

  useEffect(() => {
    if (playerRef) {
      playerRef.subscribeToStateChange(handleBind);
    }
  });

  const handleBind = (state: PlayerState) => {
    setState(state);
  };

  return (
    <>
      <Player
        ref={(player: PlayerReference) => {
          setPlayer(player);
        }}
        autoPlay
        playsInline
        src={url}
      ></Player>
      <EventList items={items} onClick={(item) => playFrom(item.timestamp)} />
      <EventRectangles currentState={state} items={items} />
    </>
  );
};
