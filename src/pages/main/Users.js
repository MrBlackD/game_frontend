import '../../App.css';
import React, {useState} from "react";
import store from "../../store";
import {Row, User, Spacer} from "@nextui-org/react";
import {QRCodeSVG} from 'qrcode.react';

export default function Users() {
    const [users, setUsers] = useState([]);

    store.subscribe(() => {
        if (store.getState().type === 'USERS') {
            setUsers(store.getState().value);
        }
    })

    return <div>
        <Row justify="center" align="center">
            <QRCodeSVG value='http://192.168.0.106:3000/user'/>
        </Row>
        {
            users.map(user => <div>
                <Spacer/>
                <Row justify="center" align="center">
                    <User
                        id="user"
                        src={user.avatar}
                        name={user.name}
                        color="gradient"
                    />
                </Row>
            </div>)
        }
    </div>
}