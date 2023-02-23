import store from "./store";
import {getPlayer} from "./constants";

const Stomp = require("stompjs");
let SockJS = require("sockjs-client");
SockJS = new SockJS('http://' + window.location.hostname + ':8081/ws');
let stompClient = Stomp.over(SockJS);

export const sendMessage = (url, msg) => {
    if ((msg.player === undefined || msg.player.name === undefined) && getPlayer() !== null) {
        msg.player = {name: getPlayer(), answer: msg.answer}
    }
    stompClient.send(url, {}, JSON.stringify(msg));
}

const onConnected = () => {
    stompClient.subscribe(
        "/user/topic/game",
        playerReceived
    );
    stompClient.subscribe(
        "/topic/game",
        gameReceived
    );
    sendMessage("/app/start", {action: "START_GAME"});
};

const onError = () => {
    console.log("Error");
}

stompClient.connect({}, onConnected, onError);

const playerReceived = (msg) => {
    const message = JSON.parse(msg.body);
    if (!message.players.find(player => player.name === getPlayer())) {
        console.log('message = ', message)
        document.cookie = 'player=; Max-Age=0'
    }
    store.dispatch({type: message.action, value: message})
}

const gameReceived = (msg) => {
    const message = JSON.parse(msg.body);
    store.dispatch({type: message.action, value: message})
}