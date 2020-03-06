import React, { Component } from 'react'

import { Button } from 'blueprints-ui'

export default class App extends Component {
  render () {
    return (
      <Button text='Click Me!' toggleable={true} />
    )
  }
}
