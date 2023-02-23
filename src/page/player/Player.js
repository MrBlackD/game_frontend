import '../../App.css';
import React, {useState} from "react";
import store from "../../store";
import {sendMessage} from "../../socket";
import {darkTheme, getPlayer} from "../../constants";
import {Button, Card, useInput, Container, Input, NextUIProvider, Row, Spacer, Text} from "@nextui-org/react";
import Answer from "./Answer";

export default function Player() {
    const [disabled, setDisabled] = useState(false);
    const [game, setGame] = useState(null);
    const [showAnswers, setShowAnswers] = useState(false);

    const [player, setPlayer] = useState('');
    const [error, setError] = useState('');
    const {value, bindings} = useInput("");

    const validateName = (value) => {
        return value.match(/^[^\s][a-zA-Zа-яА-Я\s]{0,7}$/);
    };

    const helper = React.useMemo(() => {
        setError('')
        if (!value)
            return {
                text: "",
                color: "",
                isValid: true
            };
        const isValid = validateName(value);
        return {
            text: isValid ? "Четко" : "Нечетко",
            color: isValid ? "success" : "error",
            isValid: isValid
        };
    }, [value]);

    store.subscribe(() => {
        const game = store.getState().value;
        setGame(game);
        switch (store.getState().type) {
            case 'START_GAME':
            case 'NEW_GAME':
            case 'NEW_PLAYER':
                if (game.players.find(player => player.name === getPlayer())) {
                    setDisabled(true);
                    setPlayer(game.player.name)
                } else {
                    setDisabled(false);
                }
                break;
            case 'ADD_PLAYER_SUCCESS':
                if (value !== '') {
                    console.log('ADD_PLAYER_SUCCESS = ', value)
                    document.cookie = 'player=' + value
                    setDisabled(true);
                }
                break;
            case "ADD_PLAYER_ERROR":
                setDisabled(false);
                setError(player + ' уже есть!')
                break;
            case 'CONTINUE':
            case 'ANSWER':
                setDisabled(true);
                break;
            case 'SHOW_ANSWERS':
                setDisabled(true);
                setShowAnswers(true);
        }
    })

    const onClick = answer => {
        sendMessage("/app/action", {
                action: 'ANSWER',
                answer
            }
        )
        setShowAnswers(false);
    }

    return <NextUIProvider theme={darkTheme}>
        <Container id="container">
            <Card>
                <Card.Body>
                    {game && game.gameStream[game.index] && game.gameStream[game.index].question && game.gameStream[game.index].question.answers &&
                    <Answer onClick={onClick} showAnswers={showAnswers}
                            answers={game.gameStream[game.index].question.answers}/>}
                    {!disabled && <div>
                        <Row justify="center" align="center">
                            <Input
                                {...bindings}
                                shadow={false}
                                status={error === '' ? helper.color : "error"}
                                color={error === '' ? helper.color : "error"}
                                helperColor={error === '' ? helper.color : "error"}
                                helperText={error === '' ? helper.text : error}
                                type="email"
                                placeholder={"Кто ты?"}
                                disabled={disabled}
                                size="xl"
                                bordered
                            />
                        </Row>
                        <Spacer y={2}/>
                    </div>}
                    <Row justify="center" align="center">
                        {!disabled && <Button color="gradient"
                                              size="xl"
                                              disabled={!helper.isValid || value.length === 0}
                                              onClick={() => {
                                                  sendMessage("/app/new_player", {
                                                      action: "START_GAME",
                                                      player: {name: value}
                                                  });
                                                  setDisabled(true);
                                              }}> Войти </Button>}
                        {!showAnswers && disabled && <Text
                            h2
                            weight="bold"
                            css={{
                                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                            }}>
                            Кайфуй
                        </Text>}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </NextUIProvider>
}