import '../../App.css';
import React from "react";
import Question from "./Question";
import {Row, Spacer, Table, Text, User} from "@nextui-org/react";
import {sound} from "./Main";
import round2 from '../../music/3.mp3';
import round3 from '../../music/1.mp3';

export default function Questions(props) {
    switch (props.game.gameStream[props.game.index].action) {
        case 'SHOW_RESULTS':
            sound.play()
            return <Table
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
                    {props.game.players.sort((a, b) => b.score - a.score).map(user =>
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
        case 'NEW_ROUND':
            if (props.game.gameStream[props.game.index].round.number === 2) {
                sound.src = round2;
            }
            if (props.game.gameStream[props.game.index].round.number === 3) {
                sound.src = round3;
            }
            sound.play()
            return <div>
                <Row justify="center" align="center">
                    <Text
                        h1
                        weight="bold"
                        css={{
                            textGradient: "45deg, $yellow600 -20%, $red600 100%",
                        }}>
                        {props.game.gameStream[props.game.index].round.header}
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
                        {props.game.gameStream[props.game.index].round.body}
                    </Text>
                </Row>
            </div>
        default:
            return <Question game={props.game}/>
    }
}