import React, { useState } from 'react';

interface UserInputs {
    x: number;
    y: number;
    z: number;
  }
  const [cost, setCost] = useState<number>();
  const [period, setPeriod] = useState<number>();
  const [income, setIncome] = useState<number>();
  const [downPayment, setDownPayment] = useState<number>();

  function calculate(){

    const text = 'With your gross household pay of $ a month, you are unable to afford a x-room flat which has an overall median price of $x. You can use the loan recommendation to calculate the loans that you will need to take.' ;
    return text;
  }

  


export { calculate }