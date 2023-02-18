import '../../App.css';
import React, {useState} from "react";
import store from "../../store";
import Question from "./Question";
import {Row, Spacer, Table, Text, User} from "@nextui-org/react";
import {sound} from "./Main";
import round2 from '../../music/3.mp3';
import round3 from '../../music/1.mp3';

function Questions(props) {
    const [index, setIndex] = useState(0);
    const [game, setGame] = useState(props.game);

    store.subscribe(() => {
            if (store.getState().type === 'CONTINUE') {
                setIndex(index + 1);
                setGame(store.getState().value);
            }
        }
    );

    let render = <div/>;

    if ((game && game.questions.length === index) || game.questions[index].showResults) {
        sound.play()
        render = <Table
            aria-label="Example table with static content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
        >
            <Table.Header>
                <Table.Column>Игрок</Table.Column>
                <Table.Column>Очки</Table.Column>
            </Table.Header>
            <Table.Body>
                {game.users.sort((a, b) => b.score - a.score).map(user =>
                    <Table.Row key={user.name}>
                        <Table.Cell> <User
                            id="user"
                            src={user.avatar}
                            name={user.name}
                            color="gradient"
                        /></Table.Cell>
                        <Table.Cell><Text
                            h2
                            weight="bold"
                            css={{
                                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                            }}>{user.score}</Text></Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    } else if (game.questions[index].round.newRound) {
        if (game.questions[index].round.round === 2) {
            sound.src = round2;
        }
        if (game.questions[index].round.round === 3) {
            sound.src = round3;
        }
        sound.volume = 0.4;
        sound.play()
        render = <div>
            <Row justify="center" align="center">
                <Text
                    h1
                    weight="bold"
                    css={{
                        textGradient: "45deg, $yellow600 -20%, $red600 100%",
                    }}>
                    {game.questions[index].round.header}
                </Text>
            </Row>
            <Spacer/>
            <Row justify="center" align="center">
                <Text
                    h2
                    weight="bold"
                    css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    }}>
                    {game.questions[index].round.body}
                </Text>
            </Row>
        </div>
    } else if (game && game.questions.length > index) {
        render = <Question question={game.questions[index]}/>
    }

    return render;
}

export default Questions;
