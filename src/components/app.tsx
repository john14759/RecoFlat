import React from 'react';
import { getFlats } from '../functions/api'
import { Test, Test2 } from './test'
import { FlatContext } from './context';
import '../css/app.css'
import { AppProps } from '../functions/types';
import Nav from './navbar/navbar';


const Body = (props: AppProps) => {
  const [page, setPage] = React.useState("test")

  const switchPage = (newPage: string) => {
    setPage(newPage)
  }

  let component;
  switch (page) {
    case "test":
      // component = <Test switchTo={switchPage} />
      component = <Test />
      break
    case "test2":
      // component = <Test2 switchTo={switchPage} />
      component = <Test2 />
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

const App = (props: AppProps): JSX.Element => {
  const [flats, setFlats] = React.useState([])

  // To call API only once and store in FlatContext
  React.useEffect(() => {
    getFlats()
    .then(data => setFlats(data))
  }, [])

  return (
    <FlatContext.Provider value={flats}>
      <div className="app">
        <Nav />
        <Body />
      </div>
    </FlatContext.Provider>
  );
}

export { App }