import { PageProps } from '../functions/types';
import { RepaymentScheduleItem } from '../functions/types';
import React, { useState } from 'react';
import '../css/loanReco.css'
import { exit } from 'process';

const LoanRecommendation = (props: PageProps) => {
    const [loanAmount, setLoanAmount] = useState<number>(NaN);
    const [loanTenure, setLoanTenure] = useState<number>(NaN);
    const [interestRate, setInterestRate] = useState<number>(NaN);
    const [repaymentSchedule, setRepaymentSchedule] = useState<Array<RepaymentScheduleItem>>([]);
    const [Month, setMonth] = useState({month: ''});
    // const [Year, setYear] = useState<number>(0);
    const [Year, setYear] = useState({year: ''});
    const [errorMessage, setErrorMessage] = useState("")
    // var topErrorMessageElement = document.getElementById("top-error-message") as HTMLDivElement;
    var bottomErrorMessageElement = document.getElementById("bottom-error-message") as HTMLDivElement;
    var checkCal = false;

    // Handle changes to month inputs
    const handleDateChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setMonth(prevState => ({ ...prevState, [name]: value }));
    };

    // Handle changes to year inputs
    const handleDateChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setYear(prevState => ({ ...prevState, [name]: value }));
    };

    function checkLoanAmount(amount: number){
      /* 
      Error Validation considerations:
      Loan amount should be 2 decimals, cannot be 0
      */
      if (amount === 0){
        setErrorMessage("Please enter an amount above 0!");
        return true;
      }
      else if ((amount.toFixed(0) !== amount.toString()) && (amount.toFixed(1) !== amount.toString()) && (amount.toFixed(2) !== amount.toString())){
        setErrorMessage("Please enter a valid loan amount!");
        return true;
      }

      return false;
    }

    function checkLoanTenure(tenure: number){
      /*
      Error Validation considerations:
      Loan tenure should not be 0, should be capped at 25 years,
      */
      if(tenure == 0){
        setErrorMessage("Please enter a tenure above 0!");
        return true;
      }
      else if (tenure > 25){
        setErrorMessage("Maximum tenure limit is 25 years!");
        return true;
      }

      return false;
    }

    function checkInterestRate(rate: number){
      /*
      Error Validation considerations:
      Interest rate cannot be 0, should be capped at 9%, input should be per annum
      */
      if(rate == 0){
        setErrorMessage("Please enter an interest rate above 0!");
        return true;
      }
      else if(rate>10){
        setErrorMessage("Maximum interest rate limit is 9%!");
        return true;
      }

       return false;
    }

    function checkMonth(M: number){
      if(Number.isNaN(M)){
        bottomErrorMessageElement.textContent = "Please select month!";
        return true;
      }
      return false;
    }
    function checkYear(Y: number){

      if (Number.isNaN(Y)){
        bottomErrorMessageElement.textContent = "Please select year!";
        return true;
      }
      return false;
    }

    // Function for calculating the repayment schedule and then inserting them into an array to display
    function calculateRepaymentSchedule(): void{
      const myElement = document.getElementById("estimated") as HTMLInputElement;

      // Calculation logic goes here --> formula obtained from this website: https://www.creatifwerks.com/loan-calculator-singapore/
      // Loan Details obtained from this website: https://www.singsaver.com.sg/blog/loan-tenure-singapore
      if(Number.isNaN(loanAmount) || Number.isNaN(loanTenure) || Number.isNaN(interestRate)){
        bottomErrorMessageElement.textContent = "";
        setErrorMessage("Please fill up the fields above!");
        const repaymentSchedule: RepaymentScheduleItem[] = [];
        setRepaymentSchedule(repaymentSchedule);
        myElement.innerHTML = `Estimated payoff date is`;
      }
      else if (checkLoanAmount(loanAmount) || checkLoanTenure(loanTenure) || checkInterestRate(interestRate)){
        bottomErrorMessageElement.textContent = "";
        const repaymentSchedule: RepaymentScheduleItem[] = [];
        setRepaymentSchedule(repaymentSchedule);
        myElement.innerHTML = `Estimated payoff date is`;
      }
      else if(checkMonth(parseInt(Month.month)) || checkYear(parseInt(Year.year))){
        setErrorMessage("");
        const repaymentSchedule: RepaymentScheduleItem[] = [];
        setRepaymentSchedule(repaymentSchedule);
        myElement.innerHTML = `Estimated payoff date is`;
      }
      else{
        setErrorMessage("");
        bottomErrorMessageElement.textContent = "";
        const monthlyInterestRate = interestRate / 1200;
        const monthlyPayment = loanAmount / ((Math.pow(1 + monthlyInterestRate, loanTenure*12) - 1) / (monthlyInterestRate*(Math.pow(1 + monthlyInterestRate, loanTenure*12))));
        const repaymentSchedule: RepaymentScheduleItem[] = [];

        let principle = loanAmount;
        // let year = Year;
        let year = parseInt(Year.year);
        let month = parseInt(Month.month);
        var interest = principle * monthlyInterestRate;
        var principlePaid = (monthlyPayment - interest);
        principle = principle - principlePaid;

        while (principle > 0) {
          const item: RepaymentScheduleItem = {
            date: `${month.toString().padStart(2, '0')}/${year}`,
            // interestRate: monthlyInterestRate,
            monthlyInstalment: monthlyPayment,
            interestPaid: interest,
            endingPrinciple: principle
          };
          repaymentSchedule.push(item);

          if (month == 12){
            year++;
            month=1;
          }
          else{
            month++;
          }
          interest = principle * monthlyInterestRate;
          principlePaid = (monthlyPayment - interest);
          principle = principle - principlePaid;
        }
        if(principle > -0.009){
          const item: RepaymentScheduleItem = {
            date: `${month.toString().padStart(2, '0')}/${year}`,
            // interestRate: monthlyInterestRate,
            monthlyInstalment: monthlyPayment,
            interestPaid: interest,
            endingPrinciple: principle
          };
          repaymentSchedule.push(item);

          if (month == 12){
            year++;
            month=1;
          }
          else{
            month++;
          }
        }

        setRepaymentSchedule(repaymentSchedule);

        checkCal = true;
        if (checkCal){
          myElement.innerHTML = `Estimated payoff date is ${repaymentSchedule[repaymentSchedule.length - 1].date}`;
        }
      }
    };

  return (
    <div className = 'loan-recommendation-container'>
      <div className = 'topContainer'>
        <div className = 'topHeader' >Loan Recommendation</div>
        <div className ='topBody' > Calculate your monthly mortgage repayments and plan your monthly expenses well!</div>
        <div className = 'topSeperator'>
          <div className="topInputHeader">
            <div>Loan Amount ($): </div>
            <form>
            <input placeholder='Insert Amount (SGD)' type='number' value={loanAmount} onChange={(amt) => setLoanAmount(parseFloat(amt.target.value))} required/>
            </form>
          </div>

          <div className="topInputHeader">
            <div>Loan Tenure (Years):</div>
            <form>
            <input required type="number" value={loanTenure} onChange={tnr => setLoanTenure(parseFloat(tnr.target.value))} placeholder='Insert Years'/>
            </form>
          </div>

          <div className="topInputHeader">
            <div>Interest Rate (%):</div>
            <form>
            <input required type="number" value={interestRate} onChange={intR => setInterestRate(parseFloat(intR.target.value))} placeholder='Insert Rate P.A (%)'  />
            </form>
          </div>
        </div>
        {errorMessage &&
        <div id='top-error-message'>
          {errorMessage}
        </div>}

        <div className ="button1">
          <button id = "calculator" type="button"  onClick={calculateRepaymentSchedule}>Calculate</button>
        </div>

      </div>


      <div className = 'botContainer'>
        <div className = 'botHeader' >Your repayment schedule:</div>
        <div className = 'botSeperator'>
          <div className="botBody">
            <div>Start date:</div>
          </div>
          <div className="botBody" id="estimated">
            <div>Estimated payoff date is</div>
          </div>
        </div>
        <div className="botInputHeader">
          <form>
            <select name="month" value={Month.month} onChange={handleDateChangeMonth}>
              <option value="nothing">Month</option>
              <option value="01">Jan</option>
              <option value="02">Feb</option>
              <option value="03">Mar</option>
              <option value="04">Apr</option>
              <option value="05">May</option>
              <option value="06">Jun</option>
              <option value="07">Jul</option>
              <option value="08">Aug</option>
              <option value="09">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>

            {/* <input type= "number" value={Year} onChange={year => setYear(parseFloat(year.target.value))} placeholder='Year'  /> */}
            <select name="year" value={Year.year} onChange={handleDateChangeYear}>
              <option value="nothing">Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
              <option value="2033">2033</option>
            </select>
            <div id="bottom-error-message"></div>
          </form>
        </div>

        <table className='scheduleTable'>
          <thead>
            <tr>
              <th>Date</th>
              {/* <th>Interest Rate</th> */}
              <th>Monthly Instalment</th>
              <th>Interest Paid</th>
              <th>Ending Principle</th>
            </tr>
          </thead>
            <tbody>
              {repaymentSchedule.map((item, index) => (
                <tr key={index}>
                  <td className='scheduleDate'>{item.date}</td>
                  {/* <td className='scheduleIntRate'>{item.interestRate.toFixed(2)}%</td> */}
                  <td className='scheduleInstalment'>${item.monthlyInstalment.toFixed(2)}</td>
                  <td className='scheduleIntPaid'>${item.interestPaid.toFixed(2)}</td>
                  <td className='scheduleEndingPrinc'>${item.endingPrinciple.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

    </div>
  )
}
export { LoanRecommendation }