import { Container } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import apiInstance from "../../api";
import { useRequest } from "../../utils";

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

export default function Final() {
  const {id} = useParams()
  const {data: gameSession, isLoading} = useRequest(() => apiInstance.getGameSession(id))
  console.log({gameSession, isLoading})
  if(isLoading) {
    return null;
  }
  return (
    <Container>
      <h1 className="text-center">Игра окончена</h1>
      <div className="max-w-[800px] m-auto">
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
    </Container>
  );
}
