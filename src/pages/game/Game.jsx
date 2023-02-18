import { Container } from "@nextui-org/react";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";

import { useParams } from "react-router-dom";
import apiInstance from "../../api";
import { stompClient } from "../../App";
import Question from "./Question";
import Results from "./Results";
import { BehaviorSubject } from "rxjs";

function Countdown({ seconds }) {
  console.log("seconds", seconds);
  const [timer, setTimer] = useState(seconds > 0 ? seconds : 0);
  useEffect(() => {
    if (timer === 0) {
      return;
    }
    const desc = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearTimeout(desc);
  }, [timer]);
  return timer;
}

// export const music = new BehaviorSubject()

const MusicPlayer = ({ gameSession }) => {
  const [player, setPlayer] = useState()
  return (
    <YouTube
      videoId="-By0nklu6u4"
      className="hidden"
      opts={{
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        showinfo: 0,
        iv_load_policy: 3,
      }}
      onReady={e => setPlayer(e.target)}
    />
  );
};

const selectScreen = (gameSession) => {
  switch (gameSession.currentScreen.type) {
    case "round":
      return (
        <Container className="h-full">
          <div className="flex items-center justify-center h-full ">
            <div className="flex items-center justify-center  w-[400px] h-[400px] border-4 border-indigo-200 border-b-indigo-500">
              <h1 className="text-center">{gameSession.currentScreen.title}</h1>
              <h3 className="text-center">{gameSession.currentScreen.description}</h3>
            </div>
          </div>
        </Container>
      );
    case "question":
      case "answer":
      return <Question gameSession={gameSession} />;
    case "results":
      return <Results gameSession={gameSession} />;
    default:
      return <Container>UNKNOWN TYPE</Container>;
  }
};

export default function Game() {
  const { id } = useParams();
  const [gameSession, setGameSession] = useState();
  useEffect(() => {
    apiInstance.getGameSession(id).then((res) => setGameSession(res));
    stompClient.subscribe(`/game/${id}`, (msg) => {
      setGameSession(JSON.parse(msg.body));
    });
  }, [id]);
  console.log({ gameSession });
  if (!gameSession) {
    return null;
  }
  return <>{selectScreen(gameSession)}</>;
}
