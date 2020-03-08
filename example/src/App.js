import React, { Component } from 'react'

import { Button } from 'blueprints-ui'

export default class App extends Component {

  handleClick(e) {
    console.log(e.target);
  }

  render () {
    return (
      <Button text='Click Me!' 
              toggleable
              onClick={this.handleClick} />
    )
  }
}
