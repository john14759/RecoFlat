import React from 'react';
import '../css/test.css'
import { FlatContext } from '../components/context'
import { PageProps, Flat } from '../functions/types';

function getTowns(this: any, flat: Flat) {
  let key = `${flat.town}`;
  return !this.has(key) && this.add(key);
}

const Test = (props: PageProps) => {
  const flats: Flat[] = React.useContext(FlatContext)
  const filtered = flats.filter(getTowns, new Set())
  return (
    <div className="container">
      <div onClick={() => props.switchTo("test2")}>I am a Button, Click Me!</div>
      <div>{flats.length}</div>
      <div>{filtered.length}</div>
      {filtered.map((flat) => <div key={flat._id}>{flat.town}</div>)}
    </div>
  )
}

const Test2 = (props: PageProps) => {
  const flats: Flat[] = React.useContext(FlatContext)
  return (
    <div className="container">
      <div onClick={() => props.switchTo("test")}>I am a Button, Click Me!</div>
      This is another div container
      <div>length is still {flats.length}</div>
    </div>
  )
}

export { Test, Test2 }