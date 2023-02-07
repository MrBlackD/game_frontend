import '../../App.css';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import store from "../../store";
import {sendMessage} from "../../socket";
import {darkTheme} from "../../constants";
import {Button, Card, Container, Input, NextUIProvider, Row, Spacer, Text} from "@nextui-org/react";

function User() {
    const [user, setUser] = useState('');
    const [disabled, setDisabled] = useState(window.localStorage.getItem('user'));
    const navigate = useNavigate();

    store.subscribe(() => {
        switch (store.getState().type) {
            case 'QUESTION':
                navigate("/answer");
                break;
            case 'NEW_GAME':
                setDisabled('null');
                window.localStorage.setItem('showResults', null);
                window.localStorage.setItem('showAnswers', null);
                window.localStorage.setItem('currentQuestion', null);
                window.localStorage.setItem('user', 'null');
        }
    })

    return <NextUIProvider theme={darkTheme}>
        <Container id="container">
            <Card>
                <Card.Body>
                    <Row justify="center" align="center">
                        <Input bordered placeholder="Вводи имя" disabled={disabled !== 'null'} value={user}
                               onChange={e => setUser(e.target.value)}/>
                    </Row>
                    <Spacer y={1}/>
                    <Row justify="center" align="center">
                        {disabled === 'null' ?
                            <Button color="gradient"
                                    onClick={() => {
                                        window.localStorage.setItem('user', user);
                                        sendMessage({action: 'USER', user});
                                        setDisabled('true');
                                    }}> Войти </Button> :
                            <Text
                                h2
                                weight="bold"
                                css={{
                                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                                }}>
                                Ща все будет ...
                            </Text>
                        }
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </NextUIProvider>
}

export default User;
