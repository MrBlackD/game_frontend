import { Button, Container } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../api";
import { stompClient } from "../../App";
import { useCurrentUser } from "../../auth/auth";
import { useSub } from "../../utils";

export default function Admin() {
  const { id } = useParams();
  const {data: currentUser} = useCurrentUser();
  const [gameSession, setGameSession] = useState();
  const lobby = useSub(`/lobby/${id}`, () => apiInstance.getLobby(id));
  useEffect(() => {
    apiInstance.getGameSession(id).then((res) => setGameSession(res));
    const gameSub = stompClient.subscribe(`/game/${id}`, (msg) => {
      setGameSession(JSON.parse(msg.body));
    });
    return () => gameSub.unsubscribe();
  }, [id]);
  console.log({ gameSession });
  if (!gameSession || !currentUser) {
    return null;
  }
  if (currentUser?.id !== lobby?.ownerId) {
    return <span>Вы не являетесь хостом игры</span>;
  }
  if(lobby?.status === 'finished') {
    return <span>Игра окончена</span>
  }
  return (
    <Container className="h-full p-10">
      <div className="flex justify-center items-center h-full flex-col border-2 border-gray-900">
        <h1>Управление игрой {id}</h1>
        
        <Button
          className="my-auto"
          onClick={() => apiInstance.nextScreen(id)}
          disabled={lobby.status !== "inProgress"}
        >
          Дальше
        </Button>
      </div>
    </Container>
  );
}
