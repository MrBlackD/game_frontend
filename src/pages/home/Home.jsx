import { Button, Container, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../api";
import { stompClient } from "../../App";
import { useCurrentUser } from "../../auth/auth";

const startGame = () => {
  return apiInstance.createLobby().then((lobby) => lobby.code);
};

// export const sendMessage = msg => stompClient.send("/app/start", {}, JSON.stringify(msg));
// stompClient.connect({});

export default function Home() {
  const [code, setCode] = useState();
  const navigate = useNavigate();
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading) {
    return;
  }
  return (
    <Container>
      <div className="max-w-[960px] m-auto">
        <header className="flex flex-row justify-center items-center p-2 border-4 border-indigo-200 border-b-indigo-500 my-2">
          <img
            alt="avatar"
            src={`https://api.multiavatar.com/${user?.id}.svg`}
            className="w-[64px] h-[64px] mr-2"
          />
          <span className="text-3xl uppercase">{user?.name}</span>
        </header>
        <div className=" grid grid-cols-1 gap-2">
          <div className="border-4 border-indigo-200 border-b-indigo-500 p-2 flex flex-col justify-center items-center">
            <span className="text-2xl mb-4">Новая игра</span>
            <Button
              className="m-auto"
              onClick={() =>
                startGame().then((code) => navigate(`lobby/${code}`))
              }
            >
              Начать игру
            </Button>
          </div>
          <div className="border-4 border-indigo-200 border-b-indigo-500 p-2 flex flex-col justify-center items-center">
            <span className="text-2xl  mb-4">Присоединиться к игре</span>
            <form
              className="m-auto flex flex-row items-end"
              onSubmit={() => {
                apiInstance
                  .joinLobby(code)
                  .then((res) => navigate(`lobby/${code}`));
              }}
            >
              <Input
                // label="Код комнаты"
                type="number"
                placeholder="Код комнаты"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                className="mt-2 ml-2"
                onClick={() => {
                  apiInstance
                    .joinLobby(code)
                    .then((res) => navigate(`lobby/${code}`));
                }}
              >
                Присоединиться
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}
