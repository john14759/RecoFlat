import React from 'react';
import '../css/test.css'
import { FlatContext } from './context'

function getTowns(flat) {
  let key = `${flat.town}`;
  return !this.has(key) && this.add(key);
}

const Test = (props) => {
  const flats = React.useContext(FlatContext)
  return (
    <div className="container">
      <div onClick={() => props.switchTo("test2")}>I am a Button, Click Me!</div>
      <div>{flats.length}</div>
      {flats.filter(getTowns, new Set()).map((flat) => <div key={flat._id}>{flat.town}</div>)}
    </div>
  )
}

const Test2 = (props) => {
  const flats = React.useContext(FlatContext)
  return (
    <div className="container">
      <div onClick={() => props.switchTo("test")}>I am a Button, Click Me!</div>
      This is another div container
      <div>length is still {flats.length}</div>
    </div>
  )
}

export { Test, Test2 }