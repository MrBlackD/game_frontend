import '../../App.css';
import React, {useState} from "react";
import {sendMessage} from "../../socket";
import store from "../../store";
import {useNavigate} from "react-router-dom";
import {answers, darkTheme} from "../../constants";
import {Button, Card, Container, NextUIProvider, Row, Spacer, Text} from "@nextui-org/react";

export default function Answer() {
    const [showAnswers, setShowAnswers] = useState(window.localStorage.getItem('showAnswers'));
    const [currentQuestion, setCurrentQuestion] = useState(window.localStorage.getItem('currentQuestion'));
    const navigate = useNavigate();

    const onCLick = answer => {
        sendMessage({
            action: 'ANSWER',
            answer,
            user: window.localStorage.getItem('user')
        });
        setShowAnswers('false');
        window.localStorage.setItem('showAnswers', 'false');
    };


    store.subscribe(() => {
        switch (store.getState().type) {
            case 'NEW_GAME':
                window.localStorage.setItem('showResults', null);
                window.localStorage.setItem('showAnswers', null);
                window.localStorage.setItem('currentQuestion', null);
                navigate("/user");
                break;
            case 'SHOW_ANSWERS':
                window.localStorage.setItem('currentQuestion', store.getState().value.questions[store.getState().value.currentQuestion].number);
                setCurrentQuestion(store.getState().value.questions[store.getState().value.currentQuestion].number.toString());
                window.localStorage.setItem('showAnswers', 'true');
                console.log('users = ', store.getState().value.users)
                if (store.getState().value.users.filter(u => u.name === window.localStorage.getItem('user')).find(v => v.answer === null)) {
                    setShowAnswers('true');
                }
                break
            case 'SHOW_RESULTS':
                window.localStorage.setItem('currentQuestion', store.getState().value.questions[store.getState().value.currentQuestion].number);
                setCurrentQuestion(store.getState().value.questions[store.getState().value.currentQuestion].number.toString());
                setShowAnswers('false');
                window.localStorage.setItem('showAnswers', 'false');
                break;
            case 'CONTINUE':
                window.localStorage.setItem('currentQuestion', store.getState().value.questions[store.getState().value.currentQuestion].number);
                setCurrentQuestion(store.getState().value.questions[store.getState().value.currentQuestion].number.toString());
        }
    })

    return <NextUIProvider theme={darkTheme}>
        <Container id="container">
            <Card>
                <Card.Body>
                    {showAnswers === 'true' ?
                        answers.get((currentQuestion === 'null' || currentQuestion === undefined) ? '1' : currentQuestion).map(answer =>
                            <div>
                                <Row justify="center" align="center">
                                    <Button
                                        size="xl"
                                        color="gradient"
                                        onClick={() => onCLick(answer)}>{answer}</Button>
                                </Row>
                                <Spacer/>
                            </div>) :
                        <Row justify="center" align="center">
                            <Text
                                h2
                                weight="bold"
                                css={{
                                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                                }}>
                                Смотри на телик
                            </Text> </Row>
                    }
                </Card.Body>
            </Card>
        </Container>
    </NextUIProvider>
}