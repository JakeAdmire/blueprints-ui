import React, { Component, MouseEvent } from "react";
// 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Color from 'color';
// 
import * as helpers from '../../misc/helpers';


export type IconProps = {
    icon: string
} & Partial<DefaultProps>;

type DefaultProps = { }

type IconState = { }

export class Button extends Component<IconProps, IconState> {
    constructor(props: IconProps) {
        super(props);
        this.state = { }
    }
    static defaultProps: DefaultProps = { }

    componentDidMount() { }

    render() {
        
        return (
            <FontAwesomeIcon icon="skull" />
        )
    }
}
