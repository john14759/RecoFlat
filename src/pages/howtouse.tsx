import '../css/howtouse.css'
import { PageProps } from '../functions/types';


const How = (props: PageProps) => {
    return (
      <div className='how-to-use-container'>
        <div className='how-to-use-header'>How to Use</div>
          <div className='message'>
            <div className='bracket'>
            <div className='how-to-use-title'>1. To use the Dream Home option:</div>
                <ul className='black'>
                    <li>Choose the area of housing you want (North, South, East, West etc.)</li>
                    <li>Filter accordingly to flat type, street name, and price range and our system will generate the best housing options for you.</li>
                </ul>
            </div>
            <div className='bracket'>
            <div className='how-to-use-title' >2. To use the housing calculator to determine the best choice of housing:</div>
                <ul className='black'>
                    <li>Input your gross household pay, savings and desired down payment amount to calculate your affordability and find the best housing option for you.</li>
                </ul>
            </div>
            <div className='bracket'>
            <div className='how-to-use-title'>3. To use the loan calculator:</div>
                <ul className='black'>
                    <li>Input the cost of the house, interest rate, loan term, and desired down payment amount to calculate your monthly loan payment and determine the amount you need to loan from the bank.</li>
                </ul></div>
            </div>
            
       
      </div>
    )
  }
  export { How }