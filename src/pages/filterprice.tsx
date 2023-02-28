import '../css/filterprice.css'
import { PageProps } from '../functions/types';
import { FlatContext } from '../components/context';
import BigNumber from 'bignumber.js';
import React, { useState,useContext } from 'react';


const FilterPrice = (props: PageProps) => {
    const [min, setMin] = useState<number | undefined>(undefined);
    const [max, setMax] = useState<number | undefined>(undefined);
    const [min1, setMin1] = useState<number | undefined>(undefined);
    const [max1, setMax1] = useState<number | undefined>(undefined);
    const [showResults, setShowResults] = useState(false);
    const flats = useContext(FlatContext);
    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const parsedValue = /^\d+$/.test(inputValue) ? parseInt(inputValue, 10) : undefined;
      setMin(parsedValue);
    };
    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const parsedValue = /^\d+$/.test(inputValue) ? parseInt(inputValue, 10) : undefined;
      setMax(parsedValue);
    };
    const displayPrice = (minimum: number, maximum: number) => {
      
      // Group the flats by town and flat type
      const groups = flats.reduce((result, flat) => {
        const key = `${flat.town}-${flat.flat_type}`;
        if (!result[key]) {
          result[key] = {
            town: flat.town,
            flatType: flat.flat_type,
            count: 0,
            totalPrice: new BigNumber(0),
          };
        }
        result[key].count++;
        result[key].totalPrice = result[key].totalPrice.plus(flat.resale_price);
        return result;
      }, {} as Record<string, { town: string; flatType: string; count: number; totalPrice: BigNumber }>);
      const filteredGroups = Object.values(groups)
        .filter((group) => {
          const averagePrice = group.totalPrice.dividedBy(group.count).toNumber();
          return averagePrice > minimum && averagePrice < maximum;
        })
        .sort((a, b) => {
          const avgPriceA = a.totalPrice.dividedBy(a.count).toFormat(0);
          const avgPriceB = b.totalPrice.dividedBy(b.count).toFormat(0);
          return avgPriceA.localeCompare(avgPriceB);
        });
    // Calculate the average price for each group and render the result
    return filteredGroups.map((group, i) => {
      const averagePrice = group.totalPrice.dividedBy(group.count).toFormat(0);
      return (
        <div className='tablecontent' key={i}>
          <div>{group.flatType}</div>
          <div>{group.town}</div>
          <div>{averagePrice}</div>
        </div>
        );
      });
    };
    const handleSearchClick = () => {
      setShowResults(true);
      setMin1(min);
      setMax1(max);
    }

    const minVal = () => min1 ?? 0;
    const maxVal = () => max1?? 999999999;
    return (
      <div className='container price'>
        <div className='price-filter'>
            <div className='pricehead'>
              <div className='price-header'>Filter selected: Price Range</div>
                <label htmlFor="min-input">Price Range</label>
                <br />
                  <div className='price-input'>
                  <input type="text" id="min-input" name="min" value={min ?? ""} onChange={handleMinChange}/>
                  to
                  <input type="text" id="max-input" name="max" value={max ?? ""} onChange={handleMaxChange}/>
                  <button onClick={handleSearchClick}>Search</button> 
                </div>
                <p>Now displaying the flats in the price range that you have selected</p>
              </div>
            </div>
            
        {showResults ? (
            <div className='priceResults'>
              Search Results:
              <div className='tableheader'>
                <div>Flat types</div>
                <div>Location</div>
                <div>Average sale price</div>
              </div>
              {displayPrice(minVal(), maxVal())}
            </div>
          ) : null}
        </div>
    )
}



export { FilterPrice };
