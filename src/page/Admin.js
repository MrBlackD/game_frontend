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
                        <Button color="gradient"
                                onClick={() => sendMessage("/app/action", {action: 'CONTINUE'})}>Дальше</Button>
                    </Row>
                    <Spacer y={1}/>
                    <Row justify="center" align="center">
                        <Button color="gradient" onClick={() => sendMessage("/app/action", {action: 'NEW_GAME'})}>Новая
                            игра</Button>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </NextUIProvider>
}

export default Admin;
