import '../../App.css';
import React from "react";
import YouTube from "react-youtube";
import {Button, Row, Spacer, Text, User} from "@nextui-org/react";
import {sound} from "./Main";
import {sendMessage} from "../../socket";

export default function Question(props) {
    return <div>
        <Row justify="center" align="center">
            <Text
                h2
                weight="bold"
                css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}>Ответили: </Text>
            <Text
                h2
                weight="bold"
                css={{
                    textGradient: "45deg, $yellow600 -20%, $red600 100%",
                }}>&nbsp;{props.game.players.filter(user => user.answer).length + ' / ' + props.game.players.length}</Text>
        </Row>
        <Row justify="center" align="center">
            <YouTube
                opts={{
                    height: '590',
                    width: '1240',
                    playerVars: {
                        autoplay: 1,
                        end: props.game.gameStream[props.game.index].question.end,
                        start: props.game.gameStream[props.game.index].question.start
                    },
                }}
                onPlay={() => sound.pause()}
                onEnd={() => {
                    sound.play()
                    if (props.game.gameStream[props.game.index].action === 'QUESTION') {
                        console.log('SHOW_ANSWERS')
                        sendMessage("/app/action", {action: 'SHOW_ANSWERS'})
                    }
                }
                }
                videoId={props.game.gameStream[props.game.index].question.videoId}/>
        </Row>
        <Spacer/>
        {
            props.game.gameStream[props.game.index].action === 'QUESTION' ?
                <Row justify="center" align="center">
                    {props.game.players.filter(user => user.answer)
                        .map(user => <User
                                id="user"
                                src={user.avatar}
                                color="gradient"
                                name={user.name}
                            />
                        )}
                </Row>
                : props.game.gameStream[props.game.index].question.answers
                    .sort((a, b) => a === props.game.gameStream[props.game.index].question.answer ? -1 : 1)
                    .map(answer =>
                        <div>
                            <Spacer/>
                            <Row justify="center" align="center">
                                <Button css={{fontSize: '30px'}}
                                        color={props.game.gameStream[props.game.index].question.answer === answer ? "success" : "warning"}>{answer}</Button>
                                {props.game.players.filter(user => user.answer === answer).map(user => <User
                                    id="user"
                                    src={user.avatar}
                                    color="gradient"
                                    name={user.name}
                                />)}
                            </Row>
                        </div>)
        }
    </div>
}