import '../../App.css';
import React, {useEffect, useState} from "react";
import store from "../../store";
import {Row, User, Spacer, Text} from "@nextui-org/react";
import {QRCodeSVG} from 'qrcode.react';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [ip, setIp] = useState('192.168.0.110');

    store.subscribe(() => {
        if (store.getState().type === 'USERS') {
            window.localStorage.setItem('users', store.getState().value.length);
            setUsers(store.getState().value);
        }
    })

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
                }}>&nbsp;&nbsp;&nbsp;{users.length}</Text>
        </Row>
        <Row justify="center" align="center">
            <QRCodeSVG size={'500px'} value={'http://' + ip + ':3000/user'}/>
        </Row>
        <div>
            <Spacer/>
            <Row justify="center" align="center">
                {
                    users.map(user => <User
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