import { PageProps } from '../functions/types';
import '../css/incomeCal.css'
import { FlatContext } from '../components/context';
import BigNumber from 'bignumber.js';
import React, { useState,useContext } from 'react';
import '../components/app'

const IncomeCalculator = (props: PageProps) => {

  // calculation of avg price for the flat_types
var cost1 = new BigNumber(0);
var count1 = new BigNumber(0);

var cost2 = new BigNumber(0);
var count2 = new BigNumber(0);

var cost3 = new BigNumber(0);
var count3 = new BigNumber(0);

var cost4 = new BigNumber(0);
var count4 = new BigNumber(0);

var cost5 = new BigNumber(0);
var count5 = new BigNumber(0);

var coste = new BigNumber(0);
var counte = new BigNumber(0);
const flats = useContext(FlatContext);

// to calculate the avg cost of each
for (let i = 0; i < flats.length; i++) {
 if(flats[i].flat_type === "1 ROOM"){
  cost1 = cost1.plus(flats[i].resale_price);
  count1 = count1.plus(1);
 }
 if(flats[i].flat_type === "2 ROOM"){
  cost2 = cost2.plus(flats[i].resale_price);
  count2 = count2.plus(1);
 }
 if(flats[i].flat_type === "3 ROOM"){
  cost3 = cost3.plus(flats[i].resale_price);
  count3 = count3.plus(1);
 }
 if(flats[i].flat_type === "4 ROOM"){
  cost4 = cost4.plus(flats[i].resale_price);
  count4 = count4.plus(1);
 }
 if(flats[i].flat_type === "5 ROOM"){
  cost5 = cost5.plus(flats[i].resale_price);
  count5 = count5.plus(1);
 }
 if(flats[i].flat_type === "EXECUTIVE"){
  coste = coste.plus(flats[i].resale_price);
  counte = counte.plus(1);
 }


}
cost1 = (cost1.dividedBy(count1));
cost2 = (cost2.dividedBy(count2));
cost3 = (cost3.dividedBy(count3));
cost4 = (cost4.dividedBy(count4));
cost5 = (cost5.dividedBy(count5));
coste = (coste.dividedBy(counte));
  // setting usestate to change the result container
  const [submitted,setsubmitted] = useState(false);
  const [error,seterror] = useState(false);
  const [submitted2,setsubmitted2] = useState(false);

  //error validation for the values to be fixed
  const [income1, setIncome1] = useState('income');
  const [typeOfFlat1, setTypeOfFlat1] = useState('Typeofflat');
  const [cst, setCost] = useState('cost');

    // getting the input values
  const [typeOfFlat, setTypeOfFlat] = useState('TOF');
  const [installPeriod, setInstallPeriod] = useState('INS');
  const [income, setIncome] = useState('INC');
  const [downPayment, setDownPayment] = useState('PAY');
   //check for no input after putting input
   const TOF = typeOfFlat.trim();
   const INS = installPeriod.trim();
   const INC = income.trim();
   const PAY = downPayment.trim();
  var flag = true;
  // doing a check for input value 1st error validation
  if (typeOfFlat === 'TOF' || installPeriod === 'INS' || income === 'INC' || downPayment === 'PAY'){
     flag = true;
  }
 
//2nd error validation for extreme cases
  else if (!TOF||!INS||!INC||!PAY){
     flag = true;
  }
  else {
     flag = false;
  }
  var cost = new BigNumber(0);
  var monthly = new BigNumber(0);
    //functions on caclulating the monthly payment for the resale flat
    function calculate(): void {
      const myElement = document.getElementById("test") as HTMLInputElement;
      //cost depends on what type of flat
    switch(typeOfFlat){
      case "1":
        cost = cost1;
        break;

      case '2':
        cost = cost2;
        break;
        
      case '3':
        cost = cost3;
        break;

      case '4' :
        cost = cost4;
        break;

      case '5' :
        cost = cost5;
        break;

      case 'e':
        cost = coste;
        break;

      default:
        myElement.innerHTML = "Please input the type of flat you are looking for!";
        break;

      }
      //monthly cost based on the installperiod
    switch(installPeriod){
      case '10':
        monthly = cost.minus(BigNumber(downPayment)).dividedBy(120);
        break;

      case '15':
        monthly = cost.minus(BigNumber(downPayment)).dividedBy(180);
        break;
        
      case '20':
        monthly = cost.minus(BigNumber(downPayment)).dividedBy(300);
        break;

      case '25' :
        monthly = cost.minus(BigNumber(downPayment)).dividedBy(375);
        break;

 
    }
  
    // checking if the flag is trigger for error 
    if(flag){
      setsubmitted2(false)
      setsubmitted(false)
      seterror(true)
    }
    //if no flag means it check whether the user can afford or not 
    else{

      if(monthly.isGreaterThan(Number(income))){
        seterror(false)
        setsubmitted2(false)
        setsubmitted(true);
      }

      else{
        seterror(false)
        setsubmitted(false)
        setsubmitted2(true);
      }
      // error validation to set the user input values fixed everytime button is clicked
      setIncome1(income)
      setTypeOfFlat1(typeOfFlat)
      setCost(cost.toFormat(0).toString())


  }


    // error checking for no inputs
  }


  //returning the page itself
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
          <div>Type Of Flat:</div>
          <form>
          <select className="TOF" placeholder='type of flat' onChange={(e) => setTypeOfFlat(e.target.value)} >
          <option className ="ICopt" value="">Select type of flat:</option>
          <option className ="ICopt" value="1">1 Room</option>
          <option className ="ICopt" value="2">2 Room</option>
          <option className ="ICopt" value="3">3 Room</option>
          <option className ="ICopt" value="4">4 Room</option>
          <option className ="ICopt" value="5">5 Room</option>
          <option className ="ICopt" value="e">Executive</option>

          </select> 
          </form>

     
   
      </div>
      <div className="Inputs">
          <div>Installment Period:</div>

          <form>
          <select name="INS" placeholder='10,15,20 Years' onChange={(e) => setInstallPeriod(e.target.value)}>

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
          <input name="INC" id = "income" placeholder ='monthly income' type= "number"  onChange={(e) => setIncome(e.target.value)}/>
          </form>

   
      </div>
      <div className="Inputs">
          <div>Down Payment:</div>
          <form>
          <input name="PAY" placeholder= 'down payment' type= "number" onChange={(e) => setDownPayment(e.target.value)}/>

          </form>

      </div>

      </div>
      <div className ="button">
      <button id = "calculator" type ="button" onClick ={calculate} >Calculate</button>
      </div>
      {submitted && <div className = "result"> 
      With your gross household pay of ${income1} a month, you are unable to afford a {typeOfFlat1}-Room flat which has an overall median price of ${cst}. You can use <div className = 'loan' onClick={() => props.switchTo("loanRecommendation")}>loan recommendation</div> to calculate the loans that you will need to take
      </div> }
      {error && <div className = "error">Please input a value or select an option!</div>}
      {submitted2 && <div className = "result">With your gross household pay of ${income1} a month, you are able to afford a {typeOfFlat1}-Room flat which has an overall median price of ${cst}!</div>}


    </div>
  </div>

  )
  }
export { IncomeCalculator } 