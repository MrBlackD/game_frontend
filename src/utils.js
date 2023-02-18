import { useEffect, useState } from "react";
import { stompClient } from "./App";

export const useSub = (dest, initialize) => {
  const [data, setData] = useState();
  useEffect(() => {
    initialize().then(res => setData(res))
    const sub = stompClient.subscribe(dest, (msg) => {
      try {
        setData(JSON.parse(msg.body));
      } catch (e) {
        console.log('Не удалось распарсить сообщение: ', msg)
        console.error(e);
      }
      return () => sub.unsubscribe();
    });
  }, [dest]);
  return data;
};

export const useRequest = (request) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      setIsLoading(true);
      request().then((res) => {
        setData(res);
        setIsLoading(false);
      });
    }, []);
    return { data, isLoading };
  };
