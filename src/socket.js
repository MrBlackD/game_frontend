import store from "./store";

const Stomp = require("stompjs");
let SockJS = require("sockjs-client");
SockJS = new SockJS('http://' + window.location.hostname + ':8081/ws');
let stompClient = Stomp.over(SockJS);

export const sendMessage = msg => stompClient.send("/app/start", {}, JSON.stringify(msg));

const onConnected = () => {
    stompClient.subscribe(
        "/game",
        onMessageReceived
    );
    sendMessage({action: 'START_MENU'});
};

const onError = () => {
    console.log("Error");
}

stompClient.connect({}, onConnected, onError);

const onMessageReceived = (msg) => {
    const message = JSON.parse(msg.body);

    if (message.users.find(user => user.name === window.localStorage.getItem('user')) === undefined) {
        window.localStorage.setItem('user', null);
    }

    switch (message.action) {
        case 'NEW_GAME':
            console.log('Received from server: NEW GAME');
            window.localStorage.setItem('user', null);
            store.dispatch({type: 'NEW_GAME', value: []});
            break;
        case 'QUESTION':
        case 'CONTINUE':
        case 'PLAY_VIDEO':
        case 'SHOW_ANSWERS':
            store.dispatch({type: message.action, value: message});
            break;
        case 'SHOW_RESULTS':
            store.dispatch({type: 'SHOW_RESULTS'});
            break;
        default:
            store.dispatch({type: 'USERS', value: message.users})
    }
}