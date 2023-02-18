import { Container } from "@nextui-org/react";
import { useState } from "react";
import YouTube from "react-youtube";
import apiInstance from "../../api";
import { useRequest } from "../../utils";

const MusicPlayer = ({ gameSession }) => {
  const [player, setPlayer] = useState()
  // const arr = ["L1QVcF2rmoU", "-By0nklu6u4"]
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
      onReady={e => e.target.playVideo()}
    />
  );
};

// -By0nklu6u4
const Row = ({ playerId, score }) => {
  const { data, isLoading } = useRequest(() => apiInstance.getUserBy(playerId));
  console.log({ isLoading });
  if (isLoading) {
    return null;
  }
  return ( 
    <div
      className={` flex mt-2 items-center border-b-4 border-indigo-200 border-y-indigo-500 p-2`}
    >
      <img
        alt="avatar"
        src={data ? `https://api.multiavatar.com/${data?.id}.svg` : ""}
        className="w-[64px] h-[64px] mr-1"
      />
      <span className="m-auto text-2xl uppercase overflow-hidden text-ellipsis">
        {data && data?.name}
      </span>
      <span className="text-2xl uppercase">{score}</span>
    </div>
  );
};

export default function Results({ gameSession }) {
  return (
    <Container>
      <h1 className="text-center">Результаты</h1>
      <div className="w-[800px] m-auto">
        {Object.keys(gameSession.players)
          .map((player) => ({
            playerId: player,
            score: gameSession.players[player],
          }))
          .sort((a, b) => b.score - a.score)
          .map((item) => (
            <Row playerId={item.playerId} score={item.score} />
          ))}
      </div>
      <MusicPlayer/>
    </Container>
  );
}
