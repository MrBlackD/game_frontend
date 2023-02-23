import { Button, Container, Spinner } from "@nextui-org/react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../api";
import { stompClient } from "../../App";
import { useCurrentUser } from "../../auth/auth";
import { useSub, useRequest } from "../../utils";
import Final from "../game/Final";
import Game from "../game/Game";
import Player from "../player/Player";

const User = ({ userId, kickable, id }) => {
  const { data, isLoading } = useRequest(() => apiInstance.getUserBy(userId));
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!isLoading && !!data) {
      setLoaded(true);
    }
  }, [data, isLoading]);
  return (
    <div
      className={` flex mt-2 transition-all duration-300  ${
        !loaded ? "translate-x-[800px]" : ""
      } items-center`}
    >
      <img
        alt="avatar"
        src={data ? `https://api.multiavatar.com/${data?.id}.svg` : ""}
        className="w-[64px] h-[64px] mr-1"
      />
      <span className="m-auto text-xl uppercase overflow-hidden text-ellipsis">
        {data && data?.name}
      </span>
      {kickable && (
        <Button
          className="ml-auto"
          onClick={() => apiInstance.kickUser(id, userId)}
        >
          Выгнать
        </Button>
      )}
    </div>
  );
};

const useGames = () => {
  const [games, setGames] = useState();
  useEffect(() => {
    apiInstance.getGames().then((res) => setGames(res));
  }, []);
  return games;
};

export default function Lobby() {
  const { data: currentUser } = useCurrentUser();
  const games = useGames();
  const [gameId, setGameId] = useState();

  const navigate = useNavigate();
  const { id } = useParams();
  const lobby = useSub(`/lobby/${id}`, () => apiInstance.getLobby(id));
  console.log({ lobby, gameId });
  if (!lobby?.id || !currentUser) {
    return (
      <div>
        <a href="/">Назад</a>
        Нет такой комнаты
      </div>
    );
  }
  if (lobby.status === "inProgress") {
    return lobby.participants.includes(currentUser.id) ? <Player /> : <Game />;
  }
  if (lobby.status === "finished") {
    return <Final />;
  }
  return (
    <Container>
      <div>
        <div className="flex justify-center flex-col max-w-[600px] m-auto mt-2 border-4 border-indigo-200 border-b-indigo-500 p-4 overflow-hidden">
          <div className="flex mb-2">
            <QRCodeCanvas value={`http://192.168.0.110:3000/lobby/${id}`} />
            <div className="flex flex-col text-2xl text-center items-center mb-2 ml-auto p-4">
              Комната <div className="text-5xl ml-auto">{id}</div>
            </div>
          </div>

          {currentUser.id === lobby.ownerId && (
            <>
              <select
                className="p-2 rounded-md"
                onChange={(e) => setGameId(e.target.value)}
              >
                <option value={undefined}></option>
                {games?.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
              <Button
                className="my-2"
                disabled={!gameId}
                onClick={() => apiInstance.startGame(lobby.code, gameId)}
              >
                Начать
              </Button>
            </>
          )}

          <span className="text-2xl text-center mb-2 border-b-4 border-b-indigo-500">
            Хост
          </span>
          <User userId={lobby.ownerId} />

          <span className="text-2xl text-center mb-2 border-b-4 border-b-indigo-500">
            Участники
          </span>

          <div>
            {lobby.participants.map((item) => {
              return (
                <User
                  userId={item}
                  kickable={currentUser.id === lobby.ownerId}
                  id={id}
                />
              );
            })}
          </div>

          {currentUser.id === lobby.ownerId ||
          lobby.participants.includes(currentUser.id) ? (
            <Button
              className="mt-2"
              onClick={() => {
                apiInstance.leaveLobby(id).then(() => navigate("/"));
              }}
            >
              Покинуть комнату
            </Button>
          ) : (
            <Button
              className="mt-2"
              onClick={() => {
                apiInstance.joinLobby(id);
              }}
            >
              Присоединиться
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}
