import { Container } from "@nextui-org/react";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import apiInstance from "../../api";
import { useRequest } from "../../utils";

const User = ({ userId }) => {
  const { data, isLoading } = useRequest(() => apiInstance.getUserBy(userId));
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!isLoading && !!data) {
      setLoaded(true);
    }
  }, [data, isLoading]);
  return (
    <div
      className={` flex mt-2 transition-all ${
        !loaded ? "translate-x-96" : ""
      } items-center`}
    >
      <img
        alt="avatar"
        src={data ? `https://api.multiavatar.com/${data?.id}.svg` : ""}
        className="w-[32px] h-[32px] mr-1"
      />
      <span className="m-auto text-xl uppercase text-green-300 overflow-hidden text-ellipsis">
        {data && data?.name}
      </span>
    </div>
  );
};

const Question = ({ gameSession }) => {
    const [blurPlayer, setBlurPlayer] = useState(false) 
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      showinfo: 0,
      iv_load_policy: 3,
      start: gameSession.currentScreen.start,
      end: gameSession.currentScreen.start + gameSession.currentScreen.duration,
    },
  };
  const isEverybodyGiveAnAnswer = Object.keys(gameSession.players).every(
    (player) => gameSession.answers.find((item) => item.userId)
  );

  return (
    <Container className="h-full bg-gradient-to-r from-black via-indigo-500 to-black box-border">
      <div className="h-full flex flex-col">
        {gameSession.currentScreen.type === "question" && (
          <div
            className={`h-full w-[240px] absolute right-0 z-10 p-2 bg-gradient-to-r from-transparent ${
              isEverybodyGiveAnAnswer ? "to-emerald-500" : "to-slate-800"
            } pl-[40px]`}
          >
            {gameSession.answers.map((item) => (
              <User userId={item.userId} />
            ))}
          </div>
        )}
        <span className="p-2 m-2 text-5xl text-center shadow-[0_0_13px_3px_#bc13fe] border-4 border-white rounded-xl">
        {/* <span className="p-2 m-2 text-5xl text-center shadow-[0_0_7px_#fff_0_0_10px_#fff_0_0_21px_#fff_0_0_42px_#bc13fe_0_0_82px_#bc13fe_0_0_92px_#bc13fe_0_0_102px_#bc13fe_0_0_151px_#bc13fe] border-4 border-white rounded-xl"> */}
          {gameSession.currentScreen.text}
        </span>
        <div className="grow relative">
          {gameSession.currentScreen.questionType === "video" &&
            gameSession.currentScreen.type === "question" && (
              <div className="h-[60px] w-full absolute bg-black"></div>
            )}
          {gameSession.currentScreen.questionType === "audio" &&
            gameSession.currentScreen.type === "question" && (
              <img className="m-auto" src="../note.png" />
            )}
          {gameSession.currentScreen.type === "answer" && (
            <div className="absolute z-10 m-auto flex items-center justify-center text-6xl p-4 w-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl top-0">
              {gameSession.currentScreen.rightAnswer}
            </div>
          )}
          <YouTube
            className={`h-full ${
              gameSession.currentScreen.questionType === "audio" ? "hidden" : ""
            } ${blurPlayer ? 'blur-md' : ''}`}
            videoId={gameSession.currentScreen.video}
            opts={opts}
            onReady={e => e.target.playVideo()}
            // onEnd={() => setBlurPlayer(true)}
          />
        </div>
        {/* <Countdown seconds={Math.round((gameSession.timerStart + gameSession.currentScreen.timer - Date.now() )/1000)}/> */}
      </div>
    </Container>
  );
};

export default Question;
