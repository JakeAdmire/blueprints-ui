import React, { Component, MouseEvent } from "react";
// 
import * as helpers from '../../misc/helpers';
import Color from 'color';

//-------------------------| Button Varients |-------------------------//
import { DefaultButton } from './varients/DefaultButton';
import { NeumorphismButton } from './varients/NeumorphismButton';
    // toggleable
import { ToggleableDefaultButton } from "./varients/ToggleableDefaultButton";
import { ToggleableNeumorphismButton } from './varients/ToggleableNeumorphismButton';


export type ButtonProps = {
    url?: string,
    overrideStyles?: React.CSSProperties,
    textColor?: string,
    onClick?: (event: MouseEvent<HTMLButtonElement | HTMLLabelElement>) => void
} & Partial<DefaultProps>;

type DefaultProps = {
    backgroundColor: string,
    disabled: boolean,
    text: "default",
    toggleable: boolean,
    variant: "default" | "neumorphism",
}

type ButtonState = {
    child: string,
    highlight: string,
    lowlight: string,
    textColor: string,
}

export class Button extends Component<ButtonProps, ButtonState> {
    constructor(props: ButtonProps) {
        super(props);
        this.state = {
            child: 'DefaultButton',
            textColor: this.props.textColor,
            lowlight: null,
            highlight: null
        }
    }
    static defaultProps: DefaultProps = {
        backgroundColor: "#7d7d7d",
        disabled: false,
        text: "default",
        toggleable: false,
        variant: "default",
    }

    componentDidMount() {
        this.checkForErrors();
        const newChild = this.determineChild();
        this.buildAdditionalProps(newChild);
    }

    checkForErrors() {
        const { variant, backgroundColor } = this.props;

        let errorMessage: string = "";

        if (variant.toLowerCase().includes('neumorphism') && backgroundColor.includes('gradient'))
            errorMessage = "Neumorphic Button component cannot accept backgroundColor with a value of 'gradient'";
        
        if (errorMessage.length)
            throw new Error(errorMessage);
    }

    determineChild(): string {
        const { toggleable, variant } = this.props;
        const child: string = (toggleable ? 'Toggleable' : '') + helpers.toTitleCase(variant) + 'Button';

        this.setState({ child });
        
        return child;
    }

    determineTextColor(backgroundColor: string): string {
        if (backgroundColor.includes('gradient')) {
            return '#FFF';

        } else {
            return Color(backgroundColor).luminosity() <= 0.5
                ? '#FFF'
                : '#000';
        }
    }

    buildAdditionalProps(newChild: string): void {
        if (newChild.includes('Neumorphism')) this.calculateLighting();
    }

    calculateLighting(): void {
        const backgroundColor = Color(this.props.backgroundColor);

        this.setState({
            lowlight: backgroundColor.darken(.4).alpha(.3).string(),
            highlight: backgroundColor.lighten(.4).alpha(.3).string()
        })
    }

    gatherProps(): any {
        const initialProps = this.props;
        const { child, textColor, lowlight, highlight } = this.state;
        const determineTextColor = this.determineTextColor;

        if (child.includes("Neumorphism"))
            return {...initialProps, textColor, lowlight, highlight};

        else return {...initialProps, textColor, determineTextColor};
    }

    render() {
        const buttonProps = this.gatherProps();

        switch (this.state.child) {
            case "NeumorphismButton":
                return <NeumorphismButton {...buttonProps} />
            
            case "ToggleableNeumorphismButton":
                return <ToggleableNeumorphismButton {...buttonProps} />

            case "ToggleableDefaultButton":
                return <ToggleableDefaultButton {...buttonProps} />

            default:
                return <DefaultButton {...buttonProps} />;
        }
    }
}
