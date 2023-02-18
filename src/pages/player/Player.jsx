import { Button, Container } from "@nextui-org/react";
import { shuffle } from "lodash";
import { useParams } from "react-router-dom";
import apiInstance from "../../api";
import { useCurrentUser } from "../../auth/auth";
import { useSub } from "../../utils";

export default function Player() {
  const { id } = useParams();
  const {data: user, isLoading} = useCurrentUser();
  const gameSession = useSub(`/game/${id}`, () =>
    apiInstance.getGameSession(id)
  );
  console.log({ gameSession });
  if (!gameSession || isLoading) {
    return null;
  }
  return (
    <Container className="h-full">
      <div className="flex flex-col h-full">
        <header className="flex flex-row justify-center items-center p-2 border-4 border-indigo-200 border-b-indigo-500 mt-2">
          <img
            alt="avatar"
            src={`https://api.multiavatar.com/${user?.id}.svg`}
            className="w-[64px] h-[64px]"
          />
          <span className="m-auto text-3xl uppercase">{user?.name}</span>
          <span className="text-3xl uppercase">{gameSession.players[user.id]}</span>
        </header>
        <div className="border-4 border-indigo-200 border-b-indigo-500 p-2 flex justify-center items-center flex-grow my-2 text-2xl">
          {gameSession.currentScreen.type === "question" ? (
            <div className="w-full flex flex-col">
              {gameSession.currentScreen.answerVariants.map((item) => (
                <button
                  className={`mt-2 w-full h-[60px] text-2xl p-2 rounded-xl ${gameSession.answers.some(i => i.answer === item && i.userId === user.id) ? 'bg-blue-200 text-black':'bg-blue-600'}`}
                  key={item}
                  onClick={() => apiInstance.sendAnswer({code: id, answer: item, index: gameSession.currentScreenIndex})}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : (
            <span>Ожидаем вопроса</span>
          )}
        </div>
      </div>
    </Container>
  );
}
