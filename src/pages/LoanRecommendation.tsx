import { PageProps } from '../functions/types';
import { RepaymentScheduleItem } from '../functions/types';
import React, { useState } from 'react';
import '../css/loanReco.css'

const LoanRecommendation = (props: PageProps) => {
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [loanTenure, setLoanTenure] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(0);
    const [repaymentSchedule, setRepaymentSchedule] = useState<Array<RepaymentScheduleItem>>([]);
    const [Month, setMonth] = useState({month: ''});
    const [Year, setYear] = useState<number>(0);

    // Handle changes to date inputs
    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setMonth(prevState => ({ ...prevState, [name]: value }));
    };


    // Function for calculating the repayment schedule and then inserting them into an array to display
    const calculateRepaymentSchedule = () => {
      // Calculation logic goes here
      const monthlyInterestRate = interestRate / 1200;
      const annualPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTenure));
      const repaymentSchedule: RepaymentScheduleItem[] = [];
    
      let principle = loanAmount;
      let year = Year;
      // let month = Month;
    
      while (principle > 0) {
        const interest = principle * monthlyInterestRate;
        const principlePaid = annualPayment - interest;
        principle = principle - principlePaid;
    
        const item: RepaymentScheduleItem = {
          date: `${year}`,
          interestRate: interestRate,
          monthlyInstalment: annualPayment/12,
          interestPaid: interest,
          endingPrinciple: principle
        };
        repaymentSchedule.push(item);
        
        year++;
      }
    
      setRepaymentSchedule(repaymentSchedule);
    };
  return (
    // TODO Loan recommendation page
    <div className = 'container'>
      <div className = 'topContainer'>
        <div className = 'topHeader' >Loan Recommendation</div>
        <div className ='topBody' > Calculate your monthly mortgage repayments and plan your monthly expenses well</div>
        <div className = 'topSeperator'>
          <div className="topInputHeader">
            <div>Loan Amount:</div>
            <form>
            <input type= "number" value={loanAmount} onChange={amt => setLoanAmount(parseFloat(amt.target.value))} placeholder='Insert Amount' />
            </form>
          </div>

          <div className="topInputHeader">
            <div>Loan Tenure:</div>
            <form>
            <input type= "number" value={loanTenure} onChange={tnr => setLoanTenure(parseFloat(tnr.target.value))} placeholder='Insert Amount'/>
            </form>
          </div>

          <div className="topInputHeader">
            <div>Interest Rate:</div>
            <form>
            <input type= "number" value={interestRate} onChange={intR => setInterestRate(parseFloat(intR.target.value))} placeholder='Insert Amount'  />
            </form>
          </div>

        </div>
        <div className ="button1">
        <button id = "calculator" type ="button"  onClick={calculateRepaymentSchedule}>Calculate</button>
        </div>
      </div>


      <div className = 'botContainer'>
        <div className = 'botHeader' >Your repayment schedule:</div>
        <div className ='botBody' >Start date:</div>
        <div className="botInputHeader">
          <form>
            <select name="month" value={Month.month} onChange={handleDateChange}>
              <option value="">Month</option>
              <option value="Jan">Jan</option> <option value="Feb">Feb</option> <option value="Mar">Feb</option>
              <option value="Apr">Apr</option>
              <option value="May">May</option>
              <option value="Jun">Jun</option>
              <option value="Jul">Jul</option>
              <option value="Aug">Aug</option>
              <option value="Sep">Sep</option>
              <option value="Oct">Oct</option>
              <option value="Nov">Nov</option>
              <option value="Dec">Dec</option>
            </select>

            <input type= "number" value={Year} onChange={year => setYear(parseFloat(year.target.value))} placeholder='Year'  />
          </form>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Interest Rate</th>
              <th>Monthly Instalment</th>
              <th>Interest Paid</th>
              <th>Ending Principle</th>
            </tr>
          </thead>
            <tbody>
              {repaymentSchedule.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.interestRate}%</td>
                  <td>{item.monthlyInstalment.toFixed(2)}</td>
                  <td>{item.interestPaid.toFixed(2)}</td>
                  <td>{item.endingPrinciple.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>



    </div>
  )
}
export { LoanRecommendation }