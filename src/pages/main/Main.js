import '../../App.css';
import React, {useState} from "react";
import store from "../../store";
import Users from "./Users";
import Questions from "./Questions";
import {sendMessage} from "../../socket";
import {darkTheme} from "../../constants";
import {Button, Card, Container, NextUIProvider, Row} from "@nextui-org/react";
import music from '../../music/main.mp3';

export let sound = new Audio(music);
sound.volume = 0.3;

function Main() {
    const [render, setRender] = useState(<div/>);
    const [newGame, setNewGame] = useState(true);


    store.subscribe(() => {
        switch (store.getState().type) {
            case 'QUESTION':
                setRender(<Questions game={store.getState().value}/>);
                break;
            case 'NEW_GAME':
                setRender(<Users/>);
        }
    })

    return <NextUIProvider theme={darkTheme}>
        <Container id="container">
            <Card>
                <Card.Body>
                    {newGame && <Row justify="center" align="center">
                        <Button color="gradient" onClick={() => {
                            sound.play()
                            setNewGame(false)
                            sendMessage({action: 'NEW_GAME'})
                        }}>Новая игра</Button>
                    </Row>}
                    {render}
                </Card.Body>
            </Card>
        </Container>
    </NextUIProvider>
}

export default Main;
