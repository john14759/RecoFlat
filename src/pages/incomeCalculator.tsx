import { PageProps } from '../functions/types';
import '../css/incomeCal.css'


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
          <form>
          <input type= "number" name="COF" placeholder='cost of flat'  />
          </form>

     
   
      </div>
      <div className="Inputs">
          <div>Installment Period:</div>

          <form>
          <select name="INS" placeholder='10,15,20 Years'>
          <option value="">Select Installment Period:</option>
          <option value="10">10 years</option>
          <option value="15">15 years</option>
          <option value="20">20 years</option>
          <option value="25">25 years</option>

          </select>

          </form>

     
   
      </div>
      <div className="Inputs">
          <div>Monthly Income:</div>
          <form>
          <input name="INC" placeholder ='monthly income' type= "number" />
          </form>

   
      </div>
      <div className="Inputs">
          <div>Down Payment:</div>
          <form>
          <input name="PAY" placeholder= 'down payment' type= "number"/>
          </form>

      </div>

      </div>
      <div className ="button">
      <button id = "calculator" type ="button"  >Calculate</button>
      </div>
      <div className = "result"></div>



    </div>
  </div>

  )
}
export { IncomeCalculator }