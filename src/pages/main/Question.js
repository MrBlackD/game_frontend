import '../../App.css';
import React, {useState} from "react";
import store from "../../store";
import YouTube from "react-youtube";
import {sendMessage} from "../../socket";
import {Button, Row, Spacer, Text, User} from "@nextui-org/react";
import {answers} from "../../constants";
import {sound} from "./Main";

let video;
let storeChange = false;
let type;

function Question(props) {
    const [users, setUsers] = useState([]);
    const [pause, setPause] = useState(false);
    const [showResults, setShowResults] = useState(false);

    store.subscribe(() => {
            switch (store.getState().type) {
                case 'PLAY_VIDEO':
                    if (!storeChange) {
                        console.log('PLAY_VIDEO')
                        video.playVideo()
                        type = 'PLAY_VIDEO';
                        storeChange = true;
                    }
                    break
                case 'CONTINUE':
                    setPause(false);
                    setUsers(store.getState().value.users);
                    setShowResults(false);
                    break;
                case 'SHOW_RESULTS':
                    if (!storeChange) {
                        storeChange = true;
                        type = 'SHOW_RESULTS';
                        console.log('SHOW_RESULTS');
                        video.playVideo();
                    }
                    break;
                case 'USERS':
                    setUsers(store.getState().value);
            }
        }
    );
    console.log('pause = ', pause)

    return <div>
        {pause === true && <Row justify="center" align="center">
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
                }}>&nbsp;{users.filter(user => user.answer).length + ' / ' + window.localStorage.getItem('users')}</Text>
        </Row>}
        <Row justify="center" align="center">
            <YouTube
                opts={{
                    height: '590',
                    width: '1240',
                    playerVars: {
                        autoplay: 0,
                        start: props.question.start
                    },
                }}
                onPlay={() => {
                    setPause(false);
                    sound.pause()
                    if (type === 'PLAY_VIDEO') {
                        setTimeout(() => {
                            video.pauseVideo();
                            sendMessage({action: 'SHOW_ANSWERS'})
                        }, props.question.duration)
                    }
                    if (type === 'SHOW_RESULTS') {
                        setTimeout(() => {
                            setShowResults(true)
                            video.pauseVideo();
                        }, props.question.afterDuration)
                    }
                }
                }
                onPause={() => {
                    setPause(true);
                    storeChange = false;
                    console.log('PAUSE')
                    sound.play()
                }}
                onReady={e => {
                    console.log('READY')
                    video = e.target
                }}
                videoId={props.question.id}/>
        </Row>
        <Spacer/>
        {!showResults && <Row justify="center" align="center">
            {users.filter(user => user.answer)
                .map(user => <User
                        id="user"
                        src={user.avatar}
                        color="gradient"
                        name={user.name}
                    />
                )}
        </Row>}
        {showResults && answers.get(props.question.number.toString()).sort((a, b) => a === props.question.answer ? -1 : 1).map(answer =>
            <div>
                <Spacer/>
                <Row justify="center" align="center">
                    <Button css={{fontSize: '30px'}}
                            color={props.question.answer === answer ? "success" : "warning"}>{answer}</Button>
                    {users.sort().filter(user => user.answer === answer).map(user => <User
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


export default Question;
