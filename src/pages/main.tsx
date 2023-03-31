import '../css/main.css'
import { PageProps } from '../functions/types';

const Main = (props: PageProps) => {
  return (
    <div className="main-container">
      <div className="main-header">
        <div className="main-header-title">RecoFlat</div>
        <div className="main-header-subtitle">Helping you to decide your best HDB home, one step at a time</div>
      </div>
      <div className="main-body">
        <div className="main-option" onClick={() => props.switchTo("explore")}>
          <div className='explore'>Explore your dream home now!</div>
          <div className="main-explore">Get Started</div>
        </div>
        <div className="main-option" onClick={() => props.switchTo("incomeCalculator")}>
          <div className='imgur'><img src="/img/main/income.png" alt=""></img></div>
          <div>Income Calculator</div>
        </div>
        <div className="main-option" onClick={() => props.switchTo("loanRecommendation")}>
          <div className='imgur'><img src="/img/main/loan.png" alt=""></img></div>
          <div>Loan Recommendation</div>
        </div>
      </div>
    </div>
  )
}
export { Main }