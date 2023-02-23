import '../../App.css';
import React, {useState} from "react";
import store from "../../store";
import StartGame from "./StartGame";
import Questions from "./Questions";
import {sendMessage} from "../../socket";
import {darkTheme} from "../../constants";
import {Button, Card, Container, NextUIProvider, Row} from "@nextui-org/react";
import music from '../../music/2.mp3';
import Background from "../../component/Background";

export let sound = new Audio(music);
sound.volume = 0.2;

function Main() {
    const [render, setRender] = useState(<div/>);
    const [newGame, setNewGame] = useState(true);


    store.subscribe(() => {
        switch (store.getState().type) {
            case 'NEW_GAME':
                setNewGame(true);
                break;
            case 'CONTINUE':
            case 'ANSWER':
                setNewGame(false);
                setRender(<Questions game={store.getState().value}/>);
                break;
            case 'START_GAME':
            case 'NEW_PLAYER':
                setNewGame(false);
                setRender(<StartGame players={store.getState().value.players}/>);
                break;
        }
    })

    return <NextUIProvider theme={darkTheme}>
        <Background/>
        <Container id="container">
            <Card>
                <Card.Body>
                    {newGame && <Row justify="center" align="center">
                        <Button color="gradient" onClick={() => {
                            sound.play()
                            sendMessage("/app/action", {action: 'START_GAME'})
                        }}>Начать игру</Button>
                    </Row>}
                    {!newGame && render}
                </Card.Body>
            </Card>
        </Container>
    </NextUIProvider>
}

export default Main;
