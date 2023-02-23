import '../../App.css';
import React from "react";
import {Button, Row, Spacer} from "@nextui-org/react";

export default function Answer(props) {
    return <div>
        {props.showAnswers && props.answers.map(answer =>
            <div>
                <Row justify="center" align="center">
                    <Button
                        css={{
                            'white-space': 'break-spaces',
                            'display': 'block',
                            'line-height': 'inherit'
                        }}
                        size="xl"
                        color="gradient"
                        onClick={() => props.onClick(answer)}>{answer}</Button>
                </Row>
                <Spacer/>
            </div>)
        }
    </div>
}