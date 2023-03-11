import { PageProps } from '../functions/types';
import '../css/incomeCal.css'
import {calculate} from '../functions/incomecal';


const IncomeCalculator = (props: PageProps) => {
  return (
    // TODO Income calculator page
    <div className = 'container'>
      <div className = 'topbox'>
        <div className = 'mainheader'>Which type of HDB Resale Flat?</div>
        <div className ='description' > Unsure of which flat to go for? Determine the best choice for you by entering your choices down below!</div>

      </div>



    <div className = 'bot'>
      <h1>Calculator:</h1>
      <div className = 'seperator'>
      <div className="Inputs">
          <div>Cost Of Flat:</div>
     
   
      </div>
      <div className="Inputs">
          <div>Installment Period:</div>
     
   
      </div>
      <div className="Inputs">
          <div>Monthly Income:</div>
     
   
      </div>
      <div className="Inputs">
          <div>Down Payment:</div>
     
      </div>

      </div>
      <div className ="button">
      <button id = "calculator" type ="button" onClick = {calculate}>Calculate</button>
      </div>
      <div className = "result"></div>



    </div>
  </div>

  )
}
export { IncomeCalculator }