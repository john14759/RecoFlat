import '../css/filterprice.css'
import { PageProps } from '../functions/types';
import React, { useState } from 'react';

const FilterPrice = (props: PageProps) => {
    const [min, setMin] = useState<number | undefined>(undefined);
    const [max, setMax] = useState<number | undefined>(undefined);

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = parseInt(event.target.value, 10);
      setMin(newMin);
      console.log("New min value:", newMin);
    };
    
    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = parseInt(event.target.value, 10);
      setMax(newMax);
      console.log("New max value:", newMax);
    };
    const tableContent = [];

    for (let i = 0; i < 3; i++) {
      tableContent.push(
        <div className='tablecontent' key={i}>
          <div>test</div>
          <div>test</div>
          <div>test</div>
        </div>
      );
    }

    return (
      <div className='container price'>
        <div className='price-filter'>
            <p className='price-header'>Filter selected: Price Range</p>
            <label htmlFor="min-input">Price Range</label>
            <br />
            <input type="number" id="min-input" name="min" value={min ?? ""} onChange={handleMinChange} />
            to
            <input type="number" id="max-input" name="max" value={max ?? ""} onChange={handleMaxChange} />
            <p>Now displaying the flats in the price range that you have selected</p>
        </div>
        <div className='priceResults'>
            Search Results:
            <div className='tableheader'>
                    <div >Flat types</div>
                    <div>Location</div>
                    <div>Average sale price</div>
            </div>
            {tableContent}
                    
                    
           
        </div>
      </div>
    )
}

export { FilterPrice };
