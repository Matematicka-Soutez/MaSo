import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Button from 'material-ui/Button'
import Game from '../../games/water-bottling/client/Game'
import Input from '../../games/water-bottling/client/Input'
import Timer from './components/Timer'
import masoLogo from './static/images/maso_logo.png'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: {
        start: new Date('2018-04-05T16:00:00.000Z'),
        end: new Date('2018-04-05T17:30:00.000Z'),
      },
    }
  }

  render() {
    return (
      <Router>
        <div className="App">

          <header className="App-header">
            <div className="App-logo">
              <Link to="/input">
                <img src={masoLogo} alt="logo" />
              </Link>
            </div>
            <Timer
              start={this.state.game.start}
              end={this.state.game.end} />
          </header>

          <main>
            <Button variant="raised" color="primary">
              Hello World
            </Button>
            <Route exact path="/" component={Game} />
            <Route exact path="/input" component={Input} />
          </main>

        </div>
      </Router>
    )
  }
}

export default App
