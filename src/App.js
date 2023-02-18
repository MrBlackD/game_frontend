import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/user/User";
import Main from "./pages/main/Main";
import Admin from "./pages/Admin";
import MyAdmin from "./pages/admin/Admin";
import Answer from "./pages/user/Answer";
import Home from "./pages/home/Home";
import {
  Button,
  Card,
  Container,
  NextUIProvider,
  Row,
} from "@nextui-org/react";
import { darkTheme } from "./constants";
import Auth from "./Auth";
import Lobby from "./pages/lobby/Lobby";
import { useEffect, useState } from "react";

const Stomp = require("stompjs");
let SockJS = require("sockjs-client");
SockJS = new SockJS("http://" + window.location.hostname + ":8081/ws");
const stompClient = Stomp.over(SockJS);

export { stompClient };

export default function App() {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    stompClient.connect({}, () => {
      setConnected(true);
    });
  }, []);
  if (!connected) {
    return null;
  }
  return (
    <NextUIProvider theme={darkTheme}>
      <BrowserRouter>
        <Auth>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Main />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/:id" element={<MyAdmin />} />
            <Route path="/answer" element={<Answer />} />
            <Route path="/lobby/:id" element={<Lobby />} />
          </Routes>
        </Auth>
      </BrowserRouter>
    </NextUIProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
