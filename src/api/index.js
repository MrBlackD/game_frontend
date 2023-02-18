import { user } from "../auth/auth";

const API_SERVER = "/api";

class Api {
  createUser(name) {
    return fetch(`${API_SERVER}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
      }),
    })
      .then((res) => res.json())
      .then((res) => user.next(res));
  }

  getUser() {
    return fetch(`${API_SERVER}/user`).then((res) => res.json());
  }

  createLobby() {
    return fetch(`${API_SERVER}/lobby`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  getLobby(code) {
    return fetch(`${API_SERVER}/lobby/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  joinLobby(code) {
    return fetch(`${API_SERVER}/lobby/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    }).then((res) => res.json());
  }

  leaveLobby(code) {
    return fetch(`${API_SERVER}/lobby/${code}/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  kickUser(code, userId) {
    return fetch(`${API_SERVER}/lobby/${code}/kick`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    }).then((res) => res.json());
  }

  startGame(code, gameId) {
    return fetch(`${API_SERVER}/lobby/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        gameId,
      }),
    }).then((res) => res.json());
  }

  getGames() {
    return fetch(`${API_SERVER}/games`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  getGameSession(code) {
    return fetch(`${API_SERVER}/gameSession/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  nextScreen(code) {
    return fetch(`${API_SERVER}/admin/gameSession/next`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    }).then((res) => res.json());
  }

  sendAnswer({ answer, code, index }) {
    return fetch(`${API_SERVER}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer,
        code,
        index,
      }),
    }).then((res) => res.json());
  }

  getUserBy(id) {
    return fetch(`${API_SERVER}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
}

const apiInstance = new Api();
export default apiInstance;
