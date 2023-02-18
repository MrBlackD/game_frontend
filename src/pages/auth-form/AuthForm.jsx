import { Button, Container, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import apiInstance from "../../api";
import { useCurrentUser } from "../../auth/auth";

export default function AuthForm() {
  const [userName, setUserName] = useState();
  const [loaded, setLoaded] = useState(false);
  const { data: user } = useCurrentUser();
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <form
      className={`flex flex-col justify-center max-w-[400px] border-4 border-indigo-200 border-b-indigo-500 p-8 mt-2 flex-grow transition-all duration-500 ${
        loaded ? "" : "translate-y-[-1000px]"
      }`}
      onSubmit={() => {
        apiInstance.createUser(userName);
      }}
    >
      <span className="text-center text-2xl mb-2">Ваше имя: {user?.name}</span>
      <Input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="mb-2"
      />
      <Button onClick={(e) => apiInstance.createUser(userName)}>
        Отправить
      </Button>
    </form>
  );
}
