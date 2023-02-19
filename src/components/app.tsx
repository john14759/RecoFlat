import React from 'react';
import { getFlats } from '../functions/api'
import { FlatContext } from './context';
import '../css/app.css'
import { AppProps } from '../functions/types';

const Nav = (props: AppProps) => {
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

// The component that displays the current page.
// Add new pages into the switch statement
const Body = () => {
  const [page, setPage] = React.useState("main")

  const switchPage = (newPage: string) => {
    setPage(newPage)
  }

  let component = null;
  switch (page) {
    case "main":
      component = <Main switchTo={switchPage} />
      break
    case "explore":
      component = <Explore switchTo={switchPage} />
      break
    case "incomeCalculator":
      component = <IncomeCalculator switchTo={switchPage} />
      break
    case "loanRecommendation":
      component = <LoanRecommendation switchTo={switchPage} />
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

const App = () => {
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