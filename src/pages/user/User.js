import '../../App.css';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import store from "../../store";
import {sendMessage} from "../../socket";
import {darkTheme} from "../../constants";
import {Button, Card, useInput, Container, Input, NextUIProvider, Row, Spacer, Text} from "@nextui-org/react";

function User() {
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

    const {value, reset, bindings} = useInput("");

    const validateEmail = (value) => {
        return value.match(/^[^\s][a-zA-Zа-яА-Я\s]{0,7}$/);
    };

    const helper = React.useMemo(() => {
        if (!value)
            return {
                text: "",
                color: "",
            };
        const isValid = validateEmail(value);
        return {
            text: isValid ? "Красивое имя" : "Некорректное имя",
            color: isValid ? "success" : "error",
        };
    }, [value]);

    return <NextUIProvider theme={darkTheme}>
        <Container id="container">
            <Card>
                <Card.Body>
                    <Row justify="center" align="center">
                        <Input
                            {...bindings}
                            clearable
                            shadow={false}
                            onClearClick={reset}
                            status={helper.color}
                            color={helper.color}
                            helperColor={helper.color}
                            helperText={helper.text}
                            type="email"
                            placeholder="Вводи имя"
                            disabled={disabled !== 'null' && disabled !== null}
                            size="xl"
                            bordered
                        />
                    </Row>
                    <Spacer y={2}/>
                    <Row justify="center" align="center">
                        {disabled === 'null' || disabled === null ?
                            <Button color="gradient"
                                    size="xl"
                                    disabled = {value.length === 0}
                                    onClick={() => {
                                        console.log('value = ', value);
                                        window.localStorage.setItem('user', value);
                                        sendMessage({action: 'USER', user: value});
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
