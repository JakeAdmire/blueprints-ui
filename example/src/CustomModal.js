import React from 'react'

import { Modal, Button } from 'blueprints-ui'

export class CustomModal extends React.Component {
    constructor() {
        super();
        this.state = {
            isDeleteDisabled: true
        };
    }

    componentDidUpdate() {
        if (this.props.modalStatus && this.state.isDeleteDisabled) 
            this.disabledTimout = setTimeout(() => this.setState({ isDeleteDisabled: false }), 3000);
    }

    closeModal = (deleteData) => {
        clearTimeout(this.disabledTimout);
        this.setState({ isDeleteDisabled: true });

        this.props.closeMethod();
    }

    renderCloseButton() {
        const style = {
            position:   'absolute',
            top:        '-20px',
            right:      '-20px'
        };

        return (
            <span style={style}>
                <Button text="×" 
                        backgroundColor="#ff5656"
                        onClick={this.closeModal} />
            </span>
        );
    }

    renderDeleteButton() {
        return (
            <span style={{ cursor: 'not-allowed' }}>
                <Button text="delete profile"
                        backgroundColor="#ff5656"
                        disabled={this.state.isDeleteDisabled}
                        onClick={() => this.closeModal(true)} />
            </span>
        )
    }

    render() {
        return (
            <Modal  open={this.props.modalStatus}
                    closeMethod={this.closeModal}>
                {this.renderCloseButton()}

                <h1>WARNING</h1>
                <hr />
                This change is irreversible, are you sure you want to proceed? 
                <br />
                <br />
                {this.renderDeleteButton()}
            </Modal>
        )
    }

}