import React, { Component } from 'react'
import { Modal, Button } from 'blueprints-ui'

import { CustomModal } from './CustomModal';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  render () {
    return (
      <div>
        <Button text="open modal" 
                backgroundColor="#83e529"
                textColor="white"
                onClick={() => this.setState({modalOpen: true})} />

        <CustomModal  modalStatus={this.state.modalOpen}
                      closeMethod={this.closeModal} />
      </div>
    )
  }
}
