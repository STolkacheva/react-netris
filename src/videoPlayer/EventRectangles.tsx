import { FC, useEffect, useState } from "react";
import { EventModel } from "../model/EventModel";
import { PlayerState } from "video-react";
import { v4 } from "uuid";

interface IEventRectangles {
  currentState: PlayerState | null;
  items: EventModel[];
}

export const EventRectangles: FC<IEventRectangles> = ({
  currentState,
  items,
}) => {
  const [rectangles, setRectangles] = useState<EventModel[]>([]);

  useEffect(() => {
    setRectangles(
      items.filter(
        (i: EventModel) =>
          currentState &&
          currentState.currentTime >= i.timestamp &&
          currentState.currentTime <= i.timestamp + i.duration
      )
    );
  }, [currentState, items]);

  return (
    <>
      {rectangles.map((i: EventModel) => {
        return (
          <div
            key={v4()}
            style={{
              left: i.zone.left,
              top: i.zone.top,
              width: i.zone.width,
              height: i.zone.height,
              position: "absolute",
              border: "5px solid green",
            }}
          ></div>
        );
      })}
    </>
  );
};
