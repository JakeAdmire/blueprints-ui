import React, { Component } from "react";
// 
import * as helpers from '../../misc/helpers';

//-------------------------| Button Varients |-------------------------//
import { DefaultButton } from './varients/DefaultButton';
import { NeumorphismButton } from './varients/NeumorphismButton';
    // toggleable
import { ToggleableDefaultButton } from "./varients/ToggleableDefaultButton";
import { ToggleableNeumorphismButton } from './varients/ToggleableNeumorphismButton';


export type ButtonProps = {
    url?: string,
    text?: string,
    overrideStyles?: React.CSSProperties
} & Partial<DefaultProps>;

type DefaultProps = {
    variant: "default" | "neumorphism",
    toggleable: boolean,
    backgroundColor: string
}

type ButtonState = {
    child: string
}

export class Button extends Component<ButtonProps, ButtonState> {
    static defaultProps: DefaultProps = {
        variant: "default",
        backgroundColor: "#FFF",
        toggleable: false
    }

    UNSAFE_componentWillMount() {
        this.determineChild();
    }

    determineChild() {
        const { toggleable, variant } = this.props;

        this.setState({
            child: (toggleable ? 'Toggleable' : '') + helpers.toTitleCase(variant) + 'Button'
        })
    }

    render() {

        switch (this.state.child) {
            case "NeumorphismButton":
                return <NeumorphismButton />
            
            case "ToggleableNeumorphismButton":
                return <ToggleableNeumorphismButton />

            case "ToggleableDefaultButton":
                return <ToggleableDefaultButton {...this.props} />

            default:
                return <DefaultButton {...this.props} />;
        }
    }
}
