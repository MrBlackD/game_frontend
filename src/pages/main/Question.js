import '../../App.css';
import React, {useState} from "react";
import store from "../../store";
import YouTube from "react-youtube";
import {sendMessage} from "../../socket";
import {Button, Row, Spacer, User} from "@nextui-org/react";
import {answers} from "../../constants";
import {sound} from "./Main";

let video;
let storeChange = false;
let type;

function Question(props) {
    const [users, setUsers] = useState([]);
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

    return <div>
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
                    storeChange = false;
                    console.log('PAUSE')
                    sound.play()
                }}
                onReady={e => video = e.target}
                videoId={props.question.id}/>
        </Row>
        <Spacer/>
        {!showResults && <Row justify="center" align="center">
            {users.filter(user => user.answer)
                .map(user => <div>
                        <User
                            id="user"
                            src={user.avatar}
                            color="gradient"
                            name={user.name}
                        />
                    </div>
                )}
        </Row>}
        {showResults && answers.get(props.question.number).sort((a, b) => a === props.question.answer ? -1 : 1).map(answer =>
            <div>
                <Spacer/>
                <Row justify="center" align="center">
                    <Button color={props.question.answer === answer ? "success" : "warning"}>{answer}</Button>
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
