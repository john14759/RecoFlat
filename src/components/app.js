import React from 'react';
import { getFlats } from '../api/functions'
import { Test, Test2 } from './test'
import '../css/app.css'

class Nav extends React.Component {
  render() {
    return (
      <div className="app-nav">
        <div className="app-logo">
          RecoFlat
        </div>
        <div className="app-actions">
          <div className="app-action">
            How to use
          </div>
          <div className="app-action">
            About us
          </div>
          <div className="app-action">
            Login
          </div>
        </div>
      </div>
    )
  }
}


class Body extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: "test"
    }
    this.switchPage = this.switchPage.bind(this);
  }

  switchPage(page) {
    this.setState({ page: page })
  }

  render() {
    let component;
    switch (this.state.page) {
      case "test":
        component = <Test flats={this.props.flats} switchTo={this.switchPage} />
        break
      case "test2":
        component = <Test2 flats={this.props.flats} switchTo={this.switchPage} />
        break
      default:
        component = null
        break
    }
    return (
      <div className="app-body">
        {component}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flats: []
    }
  }

  componentDidMount() {
    getFlats()
      .then(data => {
        this.setState({ flats: data })
      })
  }

  render() {
    return (
      <div className="app">
        <Nav />
        <Body flats={this.state.flats} />
      </div>
    );
  }
}

export { App }