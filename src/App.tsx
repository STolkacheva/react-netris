import { useEffect, useState } from "react";
import "./App.css";
import { EventModel } from "./model/EventModel";
import { VideoPlayer } from "./videoPlayer/VideoPlayer";

function App() {
  const [data, setData] = useState<EventModel[]>([]);

  const LINK =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  // получение данных из аналитики
  useEffect(() => {
    fetch("https://run.mocky.io/v3/085041d6-c0a5-4d4c-8ba9-829a0212d75b")
      .then((response) => response.json())
      // отсортируем данные по timestamp
      .then((data) =>
        setData(
          data.sort((a: EventModel, b: EventModel) => a.timestamp.valueOf() - b.timestamp.valueOf())
        )
      );
  }, []);

  return (
    <div className="App">
      <VideoPlayer url={LINK} items={data} />
    </div>
  );
}

export default App;
