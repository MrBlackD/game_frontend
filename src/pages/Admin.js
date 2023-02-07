import '../App.css';
import React from "react";
import {sendMessage} from "../socket";
import {NextUIProvider, Card, Row, Button, Spacer, Container} from "@nextui-org/react";
import {darkTheme} from "../constants";

function Admin() {

    return <NextUIProvider theme={darkTheme}>
        <Container id="container">
            <Card>
                <Card.Body>
                    <Row justify="center" align="center">
                        <Button color="gradient" onClick={() => sendMessage({action: 'QUESTION'})}>Начать игру</Button>
                    </Row>
                    <Spacer y={1}/>
                    <Row justify="center" align="center">
                        <Button color="gradient" onClick={() => sendMessage({action: 'CONTINUE'})}>Дальше</Button>
                    </Row>
                    <Spacer y={1}/>
                    <Row justify="center" align="center">
                        <Button color="gradient"
                                onClick={() => sendMessage({action: 'PLAY_VIDEO'})}>Воспроизвести</Button>
                    </Row>
                    <Spacer y={1}/>
                    <Row justify="center" align="center">
                        <Button color="gradient"
                                onClick={() => sendMessage({action: 'SHOW_RESULTS'})}>Результаты</Button>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </NextUIProvider>
}

export default Admin;
