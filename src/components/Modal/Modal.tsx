import React, { Component, MouseEvent } from "react";


export type ModalProps = { } & Partial<DefaultProps>;

type DefaultProps = { }

type ModalState = { }

export class Button extends Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
        this.state = { }
    }
    static defaultProps: DefaultProps = { }

    render() {
        return (
            <div></div>
        )
    }
}
