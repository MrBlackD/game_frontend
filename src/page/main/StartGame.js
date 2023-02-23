import '../../App.css';
import React, {useEffect, useState} from "react";
import {Row, User, Spacer, Text} from "@nextui-org/react";
import {QRCodeSVG} from 'qrcode.react';

export default function StartGame(props) {
    const [ip, setIp] = useState('192.168.0.110');

    useEffect(() => {
        fetch('http://localhost:8081/ip')
            .then(response => response.json())
            .then(result => setIp(result.ip))
    }, []);

    return <div>
        <Row justify="center" align="center">
            <Text
                h2
                weight="bold"
                css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}>Всего игроков: </Text>
            <Text
                h2
                weight="bold"
                css={{
                    textGradient: "45deg, $yellow600 -20%, $red600 100%",
                }}>&nbsp;&nbsp;&nbsp;{props.players.length}</Text>
        </Row>
        <Row justify="center" align="center">
            <QRCodeSVG size={'500px'} value={'http://' + ip + ':3000/player'}/>
        </Row>
        <div>
            <Spacer/>
            <Row justify="center" align="center">
                {
                    props.players.map(user => <User
                        id="user"
                        src={user.avatar}
                        name={user.name}
                        color="gradient"
                    />)
                }
            </Row>
        </div>
    </div>
}