import { PageProps } from '../functions/types';
import '../css/loanReco.css'

const LoanRecommendation = (props: PageProps) => {
  return (
    // TODO Loan recommendation page
    <div className = 'container'>
      <div className = 'topContainer'>
        <div className = 'topHeader' >Loan Recommendation</div>
        <div className ='topBody' > Calculate your monthly mortgage repayments and plan your monthly expenses well</div>
        <div className = 'topSeperator'>
          <div className="Inputs">
            <div>Loan Amount:</div>
            <form>
            <input type= "number" name="loanAmount" placeholder='Insert Amount'  />
            </form>
          </div>

          <div className="Inputs">
            <div>Loan Tenure:</div>
            <form>
            <input type= "number" name="loanTenure" placeholder='Insert Amount'/>
            </form>
          </div>

          <div className="Inputs">
            <div>Monthly Income:</div>
            <form>
            <input type= "number" name="incomeRate" placeholder='Insert Amount'  />
            </form>
          </div>

        </div>
        <div className ="button1">
        <button id = "calculator" type ="button"  >Calculate</button>
        </div>
      </div>


      <div className = 'botContainer'>
        <div className = 'botHeader' >Your repayment schedule:</div>
        <div className ='botBody' >Start date:</div>
      </div>

      <div className = "result"></div>



    </div>
  )
}
export { LoanRecommendation }