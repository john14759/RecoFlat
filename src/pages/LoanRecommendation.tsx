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
    // const [Year, setYear] = useState<number>(0);
    const [Year, setYear] = useState({year: ''});

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


    // Function for calculating the repayment schedule and then inserting them into an array to display
    const calculateRepaymentSchedule = () => {
      // Calculation logic goes here --> formula obtained by this website: https://www.creatifwerks.com/loan-calculator-singapore/
      const monthlyInterestRate = interestRate / 1200;
      const monthlyPayment = loanAmount / ((Math.pow(1 + monthlyInterestRate, loanTenure*12) - 1) / (monthlyInterestRate*(Math.pow(1 + monthlyInterestRate, loanTenure*12))));
      const repaymentSchedule: RepaymentScheduleItem[] = [];
      const myElement = document.getElementById("estimated") as HTMLInputElement;
    
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
          interestRate: interestRate,
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
          interestRate: interestRate,
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
            <input type= "number" value={loanAmount} onChange={amt => setLoanAmount(parseFloat(amt.target.value))} placeholder='Insert Amount(SGD)' />
            </form>
          </div>

          <div className="topInputHeader">
            <div>Loan Tenure:</div>
            <form>
            <input type= "number" value={loanTenure} onChange={tnr => setLoanTenure(parseFloat(tnr.target.value))} placeholder='Insert Years'/>
            </form>
          </div>

          <div className="topInputHeader">
            <div>Interest Rate:</div>
            <form>
            <input type= "number" value={interestRate} onChange={intR => setInterestRate(parseFloat(intR.target.value))} placeholder='Insert Rate(%)'  />
            </form>
          </div>

        </div>
        <div className ="button1">
        <button id = "calculator" type ="button"  onClick={calculateRepaymentSchedule}>Calculate</button>
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
              <option value="">Month</option>
              <option value="01">Jan</option> 
              <option value="02">Feb</option> 
              <option value="03">Feb</option>
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
              <option value="">Year</option>
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
            

          </form>
        </div>


        <table className='scheduleTable'>
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
                  <td className='scheduleDate'>{item.date}</td>
                  <td className='scheduleIntRate'>{item.interestRate}%</td>
                  <td className='scheduleInstalment'>{item.monthlyInstalment.toFixed(2)}</td>
                  <td className='scheduleIntPaid'>{item.interestPaid.toFixed(2)}</td>
                  <td className='scheduleEndingPrinc'>{item.endingPrinciple.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

    </div>
  )
}
export { LoanRecommendation }