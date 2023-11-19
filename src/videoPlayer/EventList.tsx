import { FC } from "react";
import { EventModel } from "../model/EventModel";
import moment from "moment";
import { v4 } from "uuid";

interface IEventList {
  items: EventModel[];
  onClick: (item: EventModel) => void;
}

export const EventList: FC<IEventList> = ({ items, onClick }) => {
  return (
    <>
      {items.map((i) => (
        <div key={v4()} onClick={() => onClick(i)}>
          {moment.unix(i.timestamp).format("mm:ss:SSS")}
        </div>
      ))}
    </>
  );
};
