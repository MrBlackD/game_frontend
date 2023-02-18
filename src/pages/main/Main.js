import '../../App.css';
import React, {useState} from "react";
import store from "../../store";
import Users from "./Users";
import Questions from "./Questions";
import {sendMessage} from "../../socket";
import {darkTheme} from "../../constants";
import {Button, Card, Container, NextUIProvider, Row} from "@nextui-org/react";
import music from '../../music/2.mp3';

export let sound = new Audio(music);
sound.volume = 0.2;

function Main() {
    const [render, setRender] = useState(<div/>);
    const [newGame, setNewGame] = useState(true);


    store.subscribe(() => {
        switch (store.getState().type) {
            case 'QUESTION':
                setRender(<Questions game={store.getState().value}/>);
                break;
            case 'NEW_GAME':
                window.localStorage.setItem('users', '0');
                setRender(<Users/>);
        }
    })

    return <NextUIProvider theme={darkTheme}>
        <div className="background">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
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
