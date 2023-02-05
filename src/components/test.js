import React from 'react';
import '../css/test.css'

function getTowns(flat) {
  let key = `${flat.town}`;
  return !this.has(key) && this.add(key);
}

class Test extends React.Component {
  render() {
    return (
      <div className="container">
        <div onClick={() => this.props.switchTo("test2")}>I am a Button, Click Me!</div>
        <div>{this.props.flats.length}</div>
        {this.props.flats.filter(getTowns, new Set()).map((flat) => <div key={flat._id}>{flat.town}</div>)}
      </div>
    )
  }
}

class Test2 extends React.Component {
  render() {
    return (
      <div className="container">
        <div onClick={() => this.props.switchTo("test")}>I am a Button, Click Me!</div>
        This is another div container
        <div>length is still {this.props.flats.length}</div>
      </div>
    )
  }
}

export { Test, Test2 }