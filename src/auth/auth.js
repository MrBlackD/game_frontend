import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import apiInstance from "../api";

export const user = new BehaviorSubject();

export const useCurrentUser = () => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true)
    apiInstance.getUser().then(res => {
      setUserData(res)
      setIsLoading(false)
    })
    const subs = user.subscribe((data) => {
      setUserData(data);
    });
    return () => subs.unsubscribe();
  }, []);
  return {data:userData, isLoading, setIsLoading};
};
